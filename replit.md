# Ferramentas Valfre - E-commerce

## Overview

Complete e-commerce platform for Ferramentas Valfre (CNPJ: 52.749.158/0001-62), a professional tools/hardware store in Cariacica-ES (Grande Vitória). Features Tiny ERP integration, MercadoPago transparent checkout, full product catalog, and a professional UI designed for high conversion.

## Key Pages & Features

- **Home**: 3-banner auto-rotating hero carousel (6s), trust block, category grid, best sellers, launches, WhatsApp CTA, brands strip
- **Category**: Price range filter (min/max + quick ranges), brand checkboxes, availability filter, pagination, sort by
- **Product Card**: PIX price (5% off), 12x installments, heart/favoriting, "Comprar Agora" + "Adicionar ao Carrinho", badges (OFF, Novo, Mais Vendido)
- **Checkout**: Free pickup option (Cariacica), shipping from viaCEP, all payment methods
- **Login/Cadastro** (`/login`): Personal vs business account type selector, form validation, show/hide password
- **Minha Conta** (`/minha-conta`): Dashboard sidebar (Pedidos, Dados, Endereços, Favoritos, Cupons, Garantias, Avaliações, Privacidade, Sair)
- **Ajuda** (`/ajuda`): FAQ Central with 8 categories, accordion, full-text search, contact block
- **Policy pages**: Privacidade, Devolução, Garantia, Entrega, Termos
- **WhatsApp button**: Floating globally, CTA section on home
- **Header**: Mega-menu (9 categories + subcategories), search, user/cart/favorites icons, Ajuda link
- **Footer**: Minha Conta links, Institucional, payment icons, CNPJ

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Routing**: Wouter
- **State**: React Query + React Context (cart)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (backend)
│   └── valfre-store/       # React Vite storefront (frontend)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed-valfre.ts  # Database seeder
└── pnpm-workspace.yaml
```

## Brand Colors (from official logo)

- **Primary (Navy Blue)**: `hsl(215, 50%, 20%)` — `#1a2d4f`
- **Secondary (Orange)**: `hsl(25, 80%, 51%)` — `#E8651A`
- **Steel Gray**: `#8B9BAE`

## Pages

- `/` — Home page (hero banner, categories, best sellers, new arrivals)
- `/categoria/:slug` — Category listing with filters and pagination
- `/produto/:slug` — Product detail with gallery, specs, related products
- `/carrinho` — Shopping cart
- `/checkout` — Multi-step checkout (PIX, Boleto, Credit Card)
- `/pedido/:id` — Order confirmation

## API Routes

- `GET /api/products` — List products (category, search, price, sort, page filters)
- `GET /api/products/featured` — Featured products for homepage
- `GET /api/products/:id` — Product detail
- `GET /api/products/:id/related` — Related products
- `GET /api/categories` — All categories with subcategories
- `GET /api/cart?sessionId=...` — Get cart
- `POST /api/cart/items` — Add to cart
- `PUT /api/cart/items/:productId` — Update cart item qty
- `DELETE /api/cart/items/:productId` — Remove from cart
- `POST /api/checkout/shipping` — Calculate shipping by CEP
- `POST /api/checkout/create` — Create order + trigger payment
- `GET /api/orders/:id` — Order status
- `POST /api/webhooks/mercadopago` — Payment webhook (idempotent)

## Environment Variables Required

```env
DATABASE_URL=            # Auto-provisioned by Replit
MERCADO_PAGO_ACCESS_TOKEN=  # MercadoPago production access token
TINY_API_TOKEN=          # Tiny ERP API token
```

## Database Tables

- `products` — Product catalog (synced from Tiny ERP)
- `categories` — Category hierarchy
- `carts` — Shopping sessions (sessionId-based, anonymous)
- `orders` — Orders with payment info and customer data

## Seeding Database

```bash
cd artifacts/api-server && tsx src/seed.ts
```

## Codegen

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Integrations

### Tiny ERP
- Products pulled via `produtos.pesquisa` API
- Customers sent via `contato.incluir`
- Orders sent via `pedido.incluir`

### MercadoPago
- Transparent checkout: PIX, Boleto, Credit Card
- Webhook at `/api/webhooks/mercadopago` for payment status updates
- Idempotency via unique key per order

## SEO

- Meta tags on each page
- Open Graph tags for social sharing
- Descriptive URL slugs (e.g., `/produto/furadeira-bosch-650w`)
