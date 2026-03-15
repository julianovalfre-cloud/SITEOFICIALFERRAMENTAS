import { Router, type IRouter } from "express";
import { db, productsTable, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as erpClient from "../services/erpClient";

const router: IRouter = Router();

const LOCAL_PICKUP: erpClient.ErpShippingOption = {
  id: "pickup",
  name: "Retirada na Loja — Cariacica/ES",
  price: 0,
  days: 0,
  carrier: "Valfre",
};

// ---------- Products ----------

router.get("/store/products", async (_req, res) => {
  try {
    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.getProducts());
    }
    const rows = await db.select().from(productsTable).limit(100);
    return res.json(rows.map(mapLocalProduct));
  } catch (err) {
    console.error("[ERP] getProducts:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

router.get("/store/products/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.getProductBySlug(slug));
    }
    const rows = await db.select().from(productsTable).where(eq(productsTable.slug, slug)).limit(1);
    if (!rows[0]) return res.status(404).json({ error: "not_found" });
    return res.json(mapLocalProduct(rows[0]));
  } catch (err) {
    console.error("[ERP] getProductBySlug:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Stock ----------

router.get("/store/stock/:sku", async (req, res) => {
  try {
    const { sku } = req.params;
    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.getStock(sku));
    }
    const rows = await db
      .select({ stock: productsTable.stock, inStock: productsTable.inStock })
      .from(productsTable)
      .where(eq(productsTable.sku, sku))
      .limit(1);
    if (!rows[0]) return res.json({ sku, stock: 0, available: false });
    return res.json({ sku, stock: rows[0].stock ?? 0, available: rows[0].inStock ?? false });
  } catch (err) {
    console.error("[ERP] getStock:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Shipping ----------

router.post("/store/shipping/calculate", async (req, res) => {
  try {
    const payload = req.body as erpClient.ErpShippingPayload;
    if (!payload?.cepDestino) {
      return res.status(400).json({ error: "cepDestino_required" });
    }

    const options: erpClient.ErpShippingOption[] = [LOCAL_PICKUP];

    if (erpClient.erpAvailable()) {
      const erpOptions = await erpClient.calculateShipping(payload);
      options.push(...erpOptions);
    } else {
      options.push(
        { id: "correios-pac",   name: "Correios PAC",        price: 18.9, days: 7, carrier: "Correios" },
        { id: "correios-sedex", name: "Correios SEDEX",      price: 29.9, days: 3, carrier: "Correios" },
        { id: "jadlog",         name: "Jadlog .Package",     price: 22.5, days: 5, carrier: "Jadlog" },
        { id: "azul-cargo",     name: "Azul Cargo Express",  price: 34.9, days: 2, carrier: "Azul Cargo" }
      );
    }

    return res.json({ options });
  } catch (err) {
    console.error("[ERP] calculateShipping:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Coupon ----------

router.post("/store/coupon/validate", async (req, res) => {
  try {
    const payload = req.body as erpClient.ErpCouponPayload;
    if (!payload?.code) return res.status(400).json({ error: "code_required" });

    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.validateCoupon(payload));
    }

    const code = String(payload.code).toUpperCase().trim();
    const MOCK: Record<string, { discount: number; discount_type: "fixed" | "percentage" }> = {
      "VALFRE10": { discount: 10, discount_type: "percentage" },
      "VALFRE20": { discount: 20, discount_type: "percentage" },
      "DESC50":   { discount: 50, discount_type: "fixed" },
    };

    if (MOCK[code]) {
      const c = MOCK[code];
      return res.json({
        valid: true, code, ...c,
        message: c.discount_type === "percentage"
          ? `${c.discount}% de desconto aplicado!`
          : `R$ ${c.discount.toFixed(2)} de desconto aplicado!`,
      });
    }

    return res.json({ valid: false, code, discount: 0, discount_type: "fixed", message: "Cupom inválido ou expirado." });
  } catch (err) {
    console.error("[ERP] validateCoupon:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Order (ERP draft) ----------

router.post("/store/order", async (req, res) => {
  try {
    const payload = req.body as erpClient.ErpOrderPayload;
    if (!payload?.customer?.email || !payload?.items?.length) {
      return res.status(400).json({ error: "invalid_payload" });
    }

    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.createOrder(payload));
    }

    const orderId = `VF-${Date.now()}`;
    const externalRef = `EXT-${orderId}`;
    const subtotal = payload.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = subtotal + payload.shipping.price - (payload.discount || 0);

    await db.insert(ordersTable).values({
      id: orderId,
      paymentMethod: payload.payment.method,
      paymentId: payload.payment.payment_id || null,
      customer: {
        name: payload.customer.name,
        email: payload.customer.email,
        phone: payload.customer.phone,
        document: payload.customer.cpf_cnpj,
        address: payload.address,
      },
      items: payload.items.map(i => ({
        productId: i.sku,
        sku: i.sku,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: "",
        stock: 0,
      })),
      subtotal: String(subtotal),
      shippingCost: String(payload.shipping.price),
      total: String(total),
      tinyOrderId: externalRef,
      idempotencyKey: `${payload.customer.email}-${orderId}`,
    });

    return res.json({ order_id: orderId, external_reference: externalRef, status: "pending" });
  } catch (err) {
    console.error("[ERP] createOrder:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Order lookup & tracking ----------

router.get("/store/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.getOrder(id));
    }
    const rows = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).limit(1);
    if (!rows[0]) return res.status(404).json({ error: "not_found" });
    const o = rows[0];
    return res.json({
      order_id: o.id,
      external_reference: o.tinyOrderId || o.id,
      status: o.status,
      payment_status: o.paymentStatus,
      shipping: { carrier: "Correios", tracking_code: null, estimated_days: 7 },
      invoice: null,
      items: o.items,
      total: parseFloat(o.total),
      created_at: o.createdAt?.toISOString(),
    });
  } catch (err) {
    console.error("[ERP] getOrder:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

router.get("/store/order/:id/tracking", async (req, res) => {
  try {
    const { id } = req.params;
    if (erpClient.erpAvailable()) {
      return res.json(await erpClient.getTracking(id));
    }
    const rows = await db.select({ id: ordersTable.id }).from(ordersTable).where(eq(ordersTable.id, id)).limit(1);
    if (!rows[0]) return res.status(404).json({ error: "not_found" });
    return res.json({ tracking_code: null, carrier: "Correios", url: null });
  } catch (err) {
    console.error("[ERP] getTracking:", err);
    return res.status(502).json({ error: "erp_unavailable" });
  }
});

// ---------- Helpers ----------

function mapLocalProduct(row: typeof productsTable.$inferSelect): erpClient.ErpProduct {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    brand: row.brand || "",
    description: row.description || "",
    price: parseFloat(row.price),
    promo_price: row.originalPrice ? parseFloat(row.originalPrice) : null,
    stock: row.stock ?? 0,
    weight: parseFloat(row.weight ?? "0.5"),
    width: 20,
    height: 10,
    length: 25,
    images: Array.isArray(row.images) ? row.images : [],
    category: row.categorySlug,
  };
}

export default router;
