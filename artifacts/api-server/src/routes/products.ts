import { Router, type IRouter } from "express";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { eq, like, and, gte, lte, desc, asc, or, ilike, sql } from "drizzle-orm";

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
