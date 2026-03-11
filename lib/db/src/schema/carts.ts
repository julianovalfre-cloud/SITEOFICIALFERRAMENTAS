import { pgTable, text, jsonb, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const cartsTable = pgTable("carts", {
  sessionId: text("session_id").primaryKey(),
  items: jsonb("items").$type<{
    productId: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
  }[]>().default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCartSchema = createInsertSchema(cartsTable);
export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = typeof cartsTable.$inferSelect;
