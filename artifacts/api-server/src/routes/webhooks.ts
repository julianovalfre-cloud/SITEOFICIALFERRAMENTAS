import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/webhooks/mercadopago", async (req, res) => {
  try {
    const { action, data } = req.body;

    if (action === "payment.updated" && data?.id) {
      const mpToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (!mpToken) {
        return res.json({ ok: true });
      }

      const paymentResp = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
        headers: { Authorization: `Bearer ${mpToken}` },
      });

      if (!paymentResp.ok) {
        return res.json({ ok: true });
      }

      const payment = await paymentResp.json() as any;
      const orderId = payment.metadata?.order_id;

      if (!orderId) {
        return res.json({ ok: true });
      }

      let paymentStatus = "pending";
      let orderStatus = "pending";

      if (payment.status === "approved") {
        paymentStatus = "approved";
        orderStatus = "processing";
      } else if (payment.status === "rejected") {
        paymentStatus = "rejected";
      } else if (payment.status === "refunded") {
        paymentStatus = "refunded";
        orderStatus = "cancelled";
      }

      await db.update(ordersTable)
        .set({ paymentStatus, status: orderStatus, updatedAt: new Date() })
        .where(eq(ordersTable.id, orderId));
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.json({ ok: true });
  }
});

export default router;
