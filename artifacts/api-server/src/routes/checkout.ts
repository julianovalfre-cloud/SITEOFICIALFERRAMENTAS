import { Router, type IRouter } from "express";
import { db, cartsTable, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();

router.post("/checkout/shipping", async (req, res) => {
  try {
    const { cep } = req.body;
    if (!cep) {
      return res.status(400).json({ error: "missing_cep" });
    }

    const cleanCep = cep.replace(/\D/g, "");

    const options = [
      {
        id: "pac",
        name: "PAC",
        carrier: "Correios",
        price: 18.9,
        days: 7,
      },
      {
        id: "sedex",
        name: "SEDEX",
        carrier: "Correios",
        price: 32.5,
        days: 3,
      },
    ];

    if (cleanCep.startsWith("0") || cleanCep.startsWith("1")) {
      options[0].days = 4;
      options[1].days = 1;
    }

    return res.json({ options });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

router.post("/checkout/create", async (req, res) => {
  try {
    const { sessionId, customer, payment, shipping } = req.body;

    if (!sessionId || !customer || !payment || !shipping) {
      return res.status(400).json({ error: "missing_fields", message: "Campos obrigatórios ausentes" });
    }

    const cart = await db.select().from(cartsTable).where(eq(cartsTable.sessionId, sessionId)).limit(1);
    if (!cart[0] || !(cart[0].items as any[]).length) {
      return res.status(400).json({ error: "empty_cart", message: "Carrinho vazio" });
    }

    const items = cart[0].items as any[];
    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
    const shippingCost = parseFloat(shipping.price) || 0;
    const total = subtotal + shippingCost;

    const orderId = randomUUID();
    const idempotencyKey = `${sessionId}-${Date.now()}`;

    let pixCode: string | undefined;
    let pixQrCode: string | undefined;
    let boletoUrl: string | undefined;
    let boletoBarcode: string | undefined;

    const mpToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    let paymentId: string | undefined;
    let orderStatus = "pending";
    let paymentStatus = "pending";

    if (mpToken) {
      try {
        const mpPayload: any = {
          transaction_amount: total,
          description: `Ferramentas Valfre - Pedido ${orderId}`,
          payer: {
            email: customer.email,
            first_name: customer.name.split(" ")[0],
            last_name: customer.name.split(" ").slice(1).join(" ") || customer.name,
            identification: {
              type: customer.document?.length === 11 ? "CPF" : "CNPJ",
              number: customer.document,
            },
            address: {
              zip_code: customer.address.cep,
              street_name: customer.address.street,
              street_number: customer.address.number,
              city: customer.address.city,
              federal_unit: customer.address.state,
            },
          },
          metadata: { order_id: orderId },
        };

        if (payment.method === "pix") {
          mpPayload.payment_method_id = "pix";
        } else if (payment.method === "boleto") {
          mpPayload.payment_method_id = "bolbradesco";
        } else if (payment.method === "credit_card" && payment.cardToken) {
          mpPayload.payment_method_id = "credit_card";
          mpPayload.token = payment.cardToken;
          mpPayload.installments = payment.installments || 1;
        }

        const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${mpToken}`,
            "Content-Type": "application/json",
            "X-Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(mpPayload),
        });

        if (mpResponse.ok) {
          const mpData = await mpResponse.json() as any;
          paymentId = String(mpData.id);

          if (payment.method === "pix" && mpData.point_of_interaction?.transaction_data) {
            pixCode = mpData.point_of_interaction.transaction_data.qr_code;
            pixQrCode = mpData.point_of_interaction.transaction_data.qr_code_base64;
          } else if (payment.method === "boleto") {
            boletoUrl = mpData.transaction_details?.external_resource_url;
            boletoBarcode = mpData.barcode?.content;
          }

          if (mpData.status === "approved") {
            paymentStatus = "approved";
            orderStatus = "processing";
          }
        }
      } catch (mpErr) {
        console.error("MercadoPago error:", mpErr);
      }
    } else {
      if (payment.method === "pix") {
        pixCode = `00020126580014br.gov.bcb.pix0136${randomUUID()}5204000053039865802BR5925FERRAMENTAS VALFRE LTDA6009SAO PAULO62070503***6304ABCD`;
        pixQrCode = "";
      } else if (payment.method === "boleto") {
        boletoUrl = "#";
        boletoBarcode = "34191.09008 09004.650003 49000.640006 3 10010000100000";
      }
    }

    const [order] = await db.insert(ordersTable).values({
      id: orderId,
      status: orderStatus,
      paymentStatus,
      paymentMethod: payment.method,
      paymentId,
      pixCode,
      pixQrCode,
      boletoUrl,
      boletoBarcode,
      items,
      customer,
      subtotal: subtotal.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      total: total.toFixed(2),
      idempotencyKey,
    }).returning();

    await db.update(cartsTable).set({ items: [], updatedAt: new Date() }).where(eq(cartsTable.sessionId, sessionId));

    await sendToTiny(order).catch(console.error);

    return res.json({
      orderId: order.id,
      status: order.status,
      paymentMethod: order.paymentMethod,
      pixCode: order.pixCode,
      pixQrCode: order.pixQrCode,
      boletoUrl: order.boletoUrl,
      boletoBarcode: order.boletoBarcode,
      total: parseFloat(order.total),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error", message: "Erro ao criar pedido" });
  }
});

async function sendToTiny(order: any) {
  const tinyToken = process.env.TINY_API_TOKEN;
  if (!tinyToken) return;

  const customerData = order.customer;
  const items = order.items as any[];

  const pedidoXml = `<?xml version="1.0" encoding="UTF-8"?>
<pedido>
  <data_pedido>${new Date().toISOString().split("T")[0]}</data_pedido>
  <situacao>Aguardando pagamento</situacao>
  <cliente>
    <nome>${customerData.name}</nome>
    <email>${customerData.email}</email>
    <fone>${customerData.phone}</fone>
    <cpf_cnpj>${customerData.document}</cpf_cnpj>
    <endereco>${customerData.address.street}</endereco>
    <numero>${customerData.address.number}</numero>
    <complemento>${customerData.address.complement || ""}</complemento>
    <bairro>${customerData.address.neighborhood || ""}</bairro>
    <cidade>${customerData.address.city}</cidade>
    <uf>${customerData.address.state}</uf>
    <cep>${customerData.address.cep}</cep>
  </cliente>
  <itens>
    ${items.map((item: any) => `
    <item>
      <codigo>${item.sku}</codigo>
      <descricao>${item.name}</descricao>
      <quantidade>${item.quantity}</quantidade>
      <valor_unitario>${item.price.toFixed(2)}</valor_unitario>
    </item>`).join("")}
  </itens>
  <valor_frete>${parseFloat(order.shippingCost).toFixed(2)}</valor_frete>
  <numero_pedido_externo>${order.id}</numero_pedido_externo>
  <obs>Forma de pagamento: ${order.paymentMethod} | ID pagamento: ${order.paymentId || "N/A"}</obs>
</pedido>`;

  await fetch(`https://api.tiny.com.br/api2/pedido.incluir.php?token=${tinyToken}&formato=JSON`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ pedido: pedidoXml }),
  });
}

export default router;
