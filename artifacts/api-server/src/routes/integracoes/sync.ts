import { Router } from "express";
import { randomUUID } from "crypto";
import { db, productsTable } from "@workspace/db";
import { fetchErpPublicProducts, type ErpPublicProduct } from "../../services/erpClient";
import { siteAuth } from "../../middlewares/siteAuth";

const router = Router();

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapErpProduct(p: ErpPublicProduct) {
  const sku = p.sku ?? `ERP-${p.id}`;
  const baseSlug = toSlug(p.nome) || `erp-${String(p.id).slice(-8)}`;

  return {
    id: randomUUID(),
    sku,
    name: p.nome,
    slug: baseSlug,
    description: null,
    price: String(parseFloat(String(p.preco)).toFixed(2)),
    stock: 0,
    inStock: false,
    images: [] as string[],
    category: "Geral",
    categorySlug: "geral",
    brand: null,
    tinyId: null,
    updatedAt: new Date(),
  };
}

router.post("/sync-products-from-erp", siteAuth, async (_req, res) => {
  if (!process.env.ERP_API_URL || !process.env.ERP_PUBLIC_BEARER_TOKEN) {
    return res.status(500).json({
      success: false,
      error: "ERP_API_URL e ERP_PUBLIC_BEARER_TOKEN devem estar configurados",
    });
  }

  let erpData;
  try {
    erpData = await fetchErpPublicProducts();
  } catch (err: any) {
    console.error("[sync] Erro ao buscar produtos do ERP:", err.message);
    return res.status(502).json({ success: false, error: `Erro ao conectar com ERP: ${err.message}` });
  }

  const products = erpData.data ?? [];
  let imported = 0;
  const errors: string[] = [];

  for (const p of products) {
    const payload = mapErpProduct(p);
    try {
      await db
        .insert(productsTable)
        .values(payload)
        .onConflictDoUpdate({
          target: productsTable.sku,
          set: {
            name: payload.name,
            slug: payload.slug,
            description: payload.description,
            price: payload.price,
            stock: payload.stock,
            inStock: payload.inStock,
            images: payload.images,
            category: payload.category,
            categorySlug: payload.categorySlug,
            brand: payload.brand,
            tinyId: payload.tinyId,
            updatedAt: payload.updatedAt,
          },
        });
      imported++;
    } catch (err: any) {
      if (err.code === "23505" && err.constraint?.includes("slug")) {
        const fallbackPayload = { ...payload, slug: `${payload.slug}-${String(p.id).slice(-6)}` };
        try {
          await db
            .insert(productsTable)
            .values(fallbackPayload)
            .onConflictDoUpdate({
              target: productsTable.sku,
              set: {
                name: fallbackPayload.name,
                slug: fallbackPayload.slug,
                description: fallbackPayload.description,
                price: fallbackPayload.price,
                stock: fallbackPayload.stock,
                inStock: fallbackPayload.inStock,
                images: fallbackPayload.images,
                category: fallbackPayload.category,
                categorySlug: fallbackPayload.categorySlug,
                brand: fallbackPayload.brand,
                tinyId: fallbackPayload.tinyId,
                updatedAt: fallbackPayload.updatedAt,
              },
            });
          imported++;
        } catch (e2: any) {
          errors.push(`SKU ${payload.sku}: ${e2.message}`);
        }
      } else {
        errors.push(`SKU ${payload.sku}: ${err.message}`);
      }
    }
  }

  console.log(`[sync] ${imported}/${products.length} produtos importados do ERP`);

  return res.json({
    success: true,
    imported,
    total: products.length,
    ...(errors.length > 0 ? { errors } : {}),
  });
});

export default router;
