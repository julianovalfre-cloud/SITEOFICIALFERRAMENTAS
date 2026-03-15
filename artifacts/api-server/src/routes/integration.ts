import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { createHash, randomBytes } from "crypto";
import { db, siteApiIntegrationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// ---------- helpers ----------

function generateToken(): string {
  const random = randomBytes(32).toString("hex");
  return `vlf_site_${random}`;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function previewToken(token: string): string {
  return `${token.slice(0, 16)}...${token.slice(-4)}`;
}

function getBaseUrl(req: Request): string {
  const host = req.headers["x-forwarded-host"] as string || req.get("host") || "";
  const proto = req.headers["x-forwarded-proto"] as string || req.protocol || "https";
  return `${proto}://${host}/api`;
}

// ---------- auth middleware ----------

export async function requireSiteIntegrationAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Missing or invalid Authorization header" });
  }
  const token = authHeader.slice(7);
  const hash = hashToken(token);

  try {
    const rows = await db
      .select()
      .from(siteApiIntegrationsTable)
      .where(eq(siteApiIntegrationsTable.tokenHash, hash))
      .limit(1);

    if (!rows[0] || !rows[0].active) {
      return res.status(401).json({ success: false, error: "Invalid or inactive token" });
    }

    await db
      .update(siteApiIntegrationsTable)
      .set({ lastUsedAt: new Date() })
      .where(eq(siteApiIntegrationsTable.id, rows[0].id));

    next();
  } catch (err) {
    console.error("[integration] auth error:", err);
    return res.status(500).json({ success: false, error: "Internal error" });
  }
}

// ---------- public endpoints ----------

router.get("/integration/config", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(siteApiIntegrationsTable)
      .where(eq(siteApiIntegrationsTable.active, true))
      .limit(1);

    return res.json({
      baseUrl: getBaseUrl(req),
      tokenPreview: rows[0]?.tokenPreview ?? null,
      tokenExists: !!rows[0],
    });
  } catch (err) {
    console.error("[integration] config error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/integration/generate-token", async (req, res) => {
  try {
    const existing = await db
      .select()
      .from(siteApiIntegrationsTable)
      .where(eq(siteApiIntegrationsTable.active, true))
      .limit(1);

    if (existing[0]) {
      return res.status(409).json({
        success: false,
        error: "Token already exists. Use /integration/regenerate-token to replace it.",
      });
    }

    const token = generateToken();
    const id = `int_${randomBytes(8).toString("hex")}`;

    await db.insert(siteApiIntegrationsTable).values({
      id,
      tokenHash: hashToken(token),
      tokenPreview: previewToken(token),
      active: true,
    });

    return res.json({
      success: true,
      token,
      baseUrl: getBaseUrl(req),
    });
  } catch (err) {
    console.error("[integration] generate error:", err);
    return res.status(500).json({ success: false, error: "Internal error" });
  }
});

router.post("/integration/regenerate-token", async (req, res) => {
  try {
    await db
      .update(siteApiIntegrationsTable)
      .set({ active: false, updatedAt: new Date() })
      .where(eq(siteApiIntegrationsTable.active, true));

    const token = generateToken();
    const id = `int_${randomBytes(8).toString("hex")}`;

    await db.insert(siteApiIntegrationsTable).values({
      id,
      tokenHash: hashToken(token),
      tokenPreview: previewToken(token),
      active: true,
    });

    return res.json({
      success: true,
      token,
      baseUrl: getBaseUrl(req),
    });
  } catch (err) {
    console.error("[integration] regenerate error:", err);
    return res.status(500).json({ success: false, error: "Internal error" });
  }
});

// ---------- protected endpoints ----------

router.post("/integration/validate", requireSiteIntegrationAuth, (_req, res) => {
  return res.json({
    success: true,
    authorized: true,
    service: "valfre ecommerce api",
  });
});

router.get("/integration/site-info", requireSiteIntegrationAuth, (_req, res) => {
  return res.json({
    success: true,
    siteName: "Ferramentas Valfre - Loja Online",
    apiVersion: "1.0.0",
    features: {
      orders:        true,
      products:      true,
      stock:         true,
      coupons:       true,
      shipping:      true,
      abandonedCart: true,
    },
  });
});

export default router;
