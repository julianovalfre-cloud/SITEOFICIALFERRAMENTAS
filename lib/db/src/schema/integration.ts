import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const siteApiIntegrationsTable = pgTable("site_api_integrations", {
  id:           text("id").primaryKey(),
  tokenHash:    text("token_hash").notNull(),
  tokenPreview: text("token_preview").notNull(),
  active:       boolean("active").default(true).notNull(),
  createdAt:    timestamp("created_at").defaultNow(),
  updatedAt:    timestamp("updated_at").defaultNow(),
  lastUsedAt:   timestamp("last_used_at"),
});

export type SiteApiIntegration = typeof siteApiIntegrationsTable.$inferSelect;
