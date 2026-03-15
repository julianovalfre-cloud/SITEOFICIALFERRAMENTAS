import { Router, type IRouter } from "express";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { eq, like, and, gte, lte, desc, asc, or, ilike, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();

router.get("/products", async (req, res) => {
  try {
    const { category, search, page = "1", limit = "24", minPrice, maxPrice, sortBy, inStock } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [];

    if (category) {
      conditions.push(eq(productsTable.categorySlug, category));
    }
    if (search) {
      conditions.push(
        or(
          ilike(productsTable.name, `%${search}%`),
          ilike(productsTable.sku, `%${search}%`),
          ilike(productsTable.brand, `%${search}%`)
        )
      );
    }
    if (minPrice) {
      conditions.push(gte(productsTable.price, minPrice));
    }
    if (maxPrice) {
      conditions.push(lte(productsTable.price, maxPrice));
    }
    if (inStock === "true") {
      conditions.push(eq(productsTable.inStock, true));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sortBy) {
      case "price_asc":
        orderBy = asc(productsTable.price);
        break;
      case "price_desc":
        orderBy = desc(productsTable.price);
        break;
      case "name_asc":
        orderBy = asc(productsTable.name);
        break;
      case "newest":
        orderBy = desc(productsTable.createdAt);
        break;
      default:
        orderBy = desc(productsTable.isBestSeller);
    }

    const [products, countResult] = await Promise.all([
      db.select().from(productsTable).where(whereClause).orderBy(orderBy).limit(limitNum).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(productsTable).where(whereClause),
    ]);

    const total = Number(countResult[0]?.count ?? 0);

    res.json({
      products: products.map(mapProduct),
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal_error", message: "Erro ao buscar produtos" });
  }
});

router.post("/products", async (req, res) => {
  try {
    console.log("[POST /products] Incoming request body:", JSON.stringify(req.body, null, 2));

    const {
      sku,
      name,
      slug,
      description,
      price,
      stock,
      images,
      status,
      category,
      categorySlug,
      brand,
      tinyId,
    } = req.body ?? {};

    if (!sku || !name || !slug) {
      return res.status(400).json({
        success: false,
        error: "missing_fields",
        message: "Campos obrigatórios: sku, name, slug",
      });
    }

    const inStock = status === "active" ? (Number(stock ?? 0) > 0) : false;
    const priceStr = String(parseFloat(String(price ?? 0)).toFixed(2));
    const stockNum = Math.max(0, parseInt(String(stock ?? 0)));

    const productPayload = {
      id: randomUUID(),
      sku: String(sku),
      name: String(name),
      slug: String(slug),
      description: description ? String(description) : null,
      price: priceStr,
      stock: stockNum,
      inStock,
      images: Array.isArray(images) ? images : [],
      category: category ? String(category) : "Geral",
      categorySlug: categorySlug ? String(categorySlug) : "geral",
      brand: brand ? String(brand) : null,
      tinyId: tinyId ? String(tinyId) : null,
      updatedAt: new Date(),
    };

    await db
      .insert(productsTable)
      .values(productPayload)
      .onConflictDoUpdate({
        target: productsTable.sku,
        set: {
          name: productPayload.name,
          slug: productPayload.slug,
          description: productPayload.description,
          price: productPayload.price,
          stock: productPayload.stock,
          inStock: productPayload.inStock,
          images: productPayload.images,
          category: productPayload.category,
          categorySlug: productPayload.categorySlug,
          brand: productPayload.brand,
          tinyId: productPayload.tinyId,
          updatedAt: productPayload.updatedAt,
        },
      });

    const SITE_BASE_URL = "https://valfre-ecom-suite--cadastrovalfre.replit.app";
    const productUrl = `${SITE_BASE_URL}/produto/${productPayload.slug}`;

    console.log(`[POST /products] Upserted SKU=${sku} → ${productUrl}`);

    return res.status(200).json({ success: true, productUrl });
  } catch (err: any) {
    console.error("[POST /products] Error:", err?.message ?? err);
    return res.status(500).json({
      success: false,
      error: "internal_error",
      message: "Erro ao publicar produto",
    });
  }
});

router.get("/products/featured", async (_req, res) => {
  try {
    const [bestSellers, newArrivals, onSale] = await Promise.all([
      db.select().from(productsTable).where(eq(productsTable.isBestSeller, true)).limit(8),
      db.select().from(productsTable).where(eq(productsTable.isNew, true)).limit(8),
      db.select().from(productsTable).where(eq(productsTable.isOnSale, true)).limit(8),
    ]);

    res.json({
      bestSellers: bestSellers.map(mapProduct),
      newArrivals: newArrivals.map(mapProduct),
      onSale: onSale.map(mapProduct),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal_error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.select().from(productsTable)
      .where(or(eq(productsTable.id, id), eq(productsTable.slug, id)))
      .limit(1);

    if (!product[0]) {
      return res.status(404).json({ error: "not_found", message: "Produto não encontrado" });
    }

    return res.json(mapProductDetail(product[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

router.get("/products/:id/related", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.select().from(productsTable)
      .where(or(eq(productsTable.id, id), eq(productsTable.slug, id)))
      .limit(1);

    if (!product[0]) {
      return res.json([]);
    }

    const related = await db.select().from(productsTable)
      .where(and(
        eq(productsTable.categorySlug, product[0].categorySlug),
        sql`${productsTable.id} != ${product[0].id}`
      ))
      .limit(6);

    return res.json(related.map(mapProduct));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

function mapProduct(p: any) {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    slug: p.slug,
    price: parseFloat(p.price),
    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : undefined,
    discountPercent: p.discountPercent || 0,
    category: p.category,
    categorySlug: p.categorySlug,
    brand: p.brand,
    images: p.images || [],
    stock: p.stock,
    inStock: p.inStock,
    rating: p.rating ? parseFloat(p.rating) : 0,
    reviewCount: p.reviewCount || 0,
    isBestSeller: p.isBestSeller,
    isNew: p.isNew,
    isOnSale: p.isOnSale,
    weight: p.weight ? parseFloat(p.weight) : undefined,
    unit: p.unit,
  };
}

function mapProductDetail(p: any) {
  return {
    ...mapProduct(p),
    description: p.description,
    longDescription: p.longDescription,
    specifications: p.specifications || [],
  };
}

export default router;
