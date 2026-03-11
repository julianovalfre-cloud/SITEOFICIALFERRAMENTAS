import { pgTable, text, decimal, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  discountPercent: integer("discount_percent").default(0),
  category: text("category").notNull(),
  categorySlug: text("category_slug").notNull(),
  brand: text("brand"),
  images: jsonb("images").$type<string[]>().default([]),
  stock: integer("stock").default(0).notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isBestSeller: boolean("is_best_seller").default(false),
  isNew: boolean("is_new").default(false),
  isOnSale: boolean("is_on_sale").default(false),
  weight: decimal("weight", { precision: 8, scale: 3 }),
  unit: text("unit").default("un"),
  description: text("description"),
  longDescription: text("long_description"),
  specifications: jsonb("specifications").$type<{ label: string; value: string }[]>().default([]),
  tinyId: text("tiny_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
