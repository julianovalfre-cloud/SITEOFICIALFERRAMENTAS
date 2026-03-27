import { Router } from "express";
import { siteAuth } from "../../middlewares/siteAuth";

const router = Router();

router.post("/", siteAuth, (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: "Campo 'products' deve ser um array" });
  }

  console.log(`[integracoes/produtos] ${products.length} produto(s) recebido(s)`);

  res.json({ success: true, received: products.length });
});

export default router;
