import { Router, type IRouter } from "express";
import { db, cartsTable, productsTable } from "@workspace/db";
import { eq, or } from "drizzle-orm";

const router: IRouter = Router();

router.get("/cart", async (req, res) => {
  try {
    const { sessionId } = req.query as { sessionId: string };
    if (!sessionId) {
      return res.status(400).json({ error: "missing_session_id" });
    }

    const cart = await getOrCreateCart(sessionId);
    return res.json(buildCartResponse(cart));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

router.post("/cart/items", async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;
    if (!sessionId || !productId || !quantity) {
      return res.status(400).json({ error: "missing_fields" });
    }

    const product = await db.select().from(productsTable)
      .where(or(eq(productsTable.id, productId), eq(productsTable.slug, productId)))
      .limit(1);

    if (!product[0]) {
      return res.status(404).json({ error: "product_not_found" });
    }

    if (!product[0].inStock || product[0].stock < quantity) {
      return res.status(400).json({ error: "insufficient_stock" });
    }

    const cart = await getOrCreateCart(sessionId);
    const items = [...(cart.items as any[])];
    const existingIndex = items.findIndex((i: any) => i.productId === product[0].id);

    if (existingIndex >= 0) {
      const newQty = items[existingIndex].quantity + quantity;
      if (newQty > product[0].stock) {
        return res.status(400).json({ error: "insufficient_stock" });
      }
      items[existingIndex].quantity = newQty;
    } else {
      items.push({
        productId: product[0].id,
        sku: product[0].sku,
        name: product[0].name,
        price: parseFloat(product[0].price),
        quantity,
        image: (product[0].images as string[])[0] || "",
        stock: product[0].stock,
      });
    }

    const updated = await db.update(cartsTable)
      .set({ items, updatedAt: new Date() })
      .where(eq(cartsTable.sessionId, sessionId))
      .returning();

    return res.json(buildCartResponse(updated[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

router.put("/cart/items/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { sessionId, quantity } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "missing_session_id" });
    }

    const cart = await getOrCreateCart(sessionId);
    let items = [...(cart.items as any[])];

    if (quantity <= 0) {
      items = items.filter((i: any) => i.productId !== productId);
    } else {
      const idx = items.findIndex((i: any) => i.productId === productId);
      if (idx >= 0) {
        items[idx].quantity = quantity;
      }
    }

    const updated = await db.update(cartsTable)
      .set({ items, updatedAt: new Date() })
      .where(eq(cartsTable.sessionId, sessionId))
      .returning();

    return res.json(buildCartResponse(updated[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

router.delete("/cart/items/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { sessionId } = req.query as { sessionId: string };

    if (!sessionId) {
      return res.status(400).json({ error: "missing_session_id" });
    }

    const cart = await getOrCreateCart(sessionId);
    const items = (cart.items as any[]).filter((i: any) => i.productId !== productId);

    const updated = await db.update(cartsTable)
      .set({ items, updatedAt: new Date() })
      .where(eq(cartsTable.sessionId, sessionId))
      .returning();

    return res.json(buildCartResponse(updated[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

async function getOrCreateCart(sessionId: string) {
  const existing = await db.select().from(cartsTable).where(eq(cartsTable.sessionId, sessionId)).limit(1);
  if (existing[0]) return existing[0];

  const [created] = await db.insert(cartsTable).values({ sessionId, items: [] }).returning();
  return created;
}

function buildCartResponse(cart: any) {
  const items = (cart.items as any[]) || [];
  const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  return {
    sessionId: cart.sessionId,
    items,
    subtotal,
    total: subtotal,
    itemCount: items.reduce((sum: number, i: any) => sum + i.quantity, 0),
  };
}

export default router;
