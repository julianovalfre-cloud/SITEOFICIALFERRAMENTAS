import { Router } from "express";
import { siteAuth } from "../../middlewares/siteAuth";

const router = Router();

router.post("/pedido", siteAuth, async (req, res) => {
  const pedido = req.body;

  console.log("[integracoes/site] Pedido recebido do site:", JSON.stringify(pedido, null, 2));

  res.json({ success: true, message: "Pedido recebido" });
});

router.post("/webhook/status", async (req, res) => {
  console.log("[integracoes/site] Status recebido:", req.body);
  res.json({ ok: true });
});

router.post("/webhook/estoque", async (req, res) => {
  console.log("[integracoes/site] Estoque recebido:", req.body);
  res.json({ ok: true });
});

router.post("/webhook/preco", async (req, res) => {
  console.log("[integracoes/site] Preço recebido:", req.body);
  res.json({ ok: true });
});

router.post("/webhook/produto", async (req, res) => {
  console.log("[integracoes/site] Produto recebido:", req.body);
  res.json({ ok: true });
});

export default router;
