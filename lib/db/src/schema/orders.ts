import { pgTable, text, decimal, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default("pending"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paymentMethod: text("payment_method").notNull(),
  paymentId: text("payment_id"),
  pixCode: text("pix_code"),
  pixQrCode: text("pix_qr_code"),
  boletoUrl: text("boleto_url"),
  boletoBarcode: text("boleto_barcode"),
  items: jsonb("items").$type<{
    productId: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
  }[]>().default([]),
  customer: jsonb("customer").$type<{
    name: string;
    email: string;
    phone: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      cep: string;
    };
  }>().notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  tinyOrderId: text("tiny_order_id"),
  idempotencyKey: text("idempotency_key").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
