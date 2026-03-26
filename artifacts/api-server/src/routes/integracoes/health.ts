import { Router } from "express";
import { siteAuth } from "../../middlewares/siteAuth";

const router = Router();

router.get("/", siteAuth, (_req, res) => {
  res.json({ ok: true, service: "valfre-site", timestamp: new Date().toISOString() });
});

export default router;
