import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).limit(1);

    if (!order[0]) {
      return res.status(404).json({ error: "not_found", message: "Pedido não encontrado" });
    }

    const o = order[0];
    return res.json({
      id: o.id,
      status: o.status,
      paymentStatus: o.paymentStatus,
      paymentMethod: o.paymentMethod,
      items: o.items,
      subtotal: parseFloat(o.subtotal),
      shippingCost: parseFloat(o.shippingCost || "0"),
      total: parseFloat(o.total),
      createdAt: o.createdAt?.toISOString(),
      customer: {
        name: (o.customer as any)?.name,
        email: (o.customer as any)?.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

export default router;
