import { Router } from "express";
import { siteAuth } from "../../middlewares/siteAuth";

const router = Router();

const store = new Map<string, object>();

router.post("/", siteAuth, (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: "Campo 'products' deve ser um array" });
  }

  for (const product of products) {
    if (product.id) {
      store.set(String(product.id), product);
    }
  }

  console.log(`[integracoes/produtos] ${products.length} recebido(s) — total em memória: ${store.size}`);

  res.json({ success: true, received: products.length, total: store.size });
});

router.get("/", siteAuth, (_req, res) => {
  const products = Array.from(store.values());
  res.json({ success: true, count: products.length, products });
});

export default router;
