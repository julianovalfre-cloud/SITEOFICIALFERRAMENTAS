const ERP_API_URL = process.env.ERP_API_URL;
const ERP_PUBLIC_API_KEY = process.env.ERP_PUBLIC_API_KEY;
const ERP_PUBLIC_BEARER_TOKEN = process.env.ERP_PUBLIC_BEARER_TOKEN;

function erpAvailable(): boolean {
  return !!ERP_API_URL;
}

async function erpFetch(path: string, options: RequestInit = {}) {
  if (!ERP_API_URL) {
    throw new Error("ERP_API_URL not configured");
  }
  const url = `${ERP_API_URL.replace(/\/$/, "")}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (ERP_PUBLIC_API_KEY) {
    headers["X-Api-Key"] = ERP_PUBLIC_API_KEY;
  }
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ERP error ${res.status}: ${text}`);
  }
  return res.json();
}

async function erpBearerFetch(path: string, options: RequestInit = {}) {
  if (!ERP_API_URL) throw new Error("ERP_API_URL not configured");
  if (!ERP_PUBLIC_BEARER_TOKEN) throw new Error("ERP_PUBLIC_BEARER_TOKEN not configured");

  const url = `${ERP_API_URL.replace(/\/$/, "")}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ERP_PUBLIC_BEARER_TOKEN}`,
    ...(options.headers as Record<string, string>),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ERP error ${res.status}: ${text}`);
  }
  return res.json();
}

export interface ErpPublicProduct {
  id: string;
  nome: string;
  sku: string | null;
  preco: number;
  ativo: boolean;
}

export interface ErpPublicProductsResponse {
  data: ErpPublicProduct[];
  count: number;
}

export async function fetchErpPublicProducts(): Promise<ErpPublicProductsResponse> {
  return erpBearerFetch("/api/public/v2/produtos");
}

export interface ErpProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  promo_price: number | null;
  stock: number;
  weight: number;
  width: number;
  height: number;
  length: number;
  images: string[];
  category: string;
}

export interface ErpStock {
  sku: string;
  stock: number;
  available: boolean;
}

export interface ErpShippingProduct {
  sku: string;
  name: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
}

export interface ErpShippingPayload {
  cepDestino: string;
  products: ErpShippingProduct[];
}

export interface ErpShippingOption {
  id: string;
  name: string;
  price: number;
  days: number;
  carrier: string;
  service_id?: string;
}

export interface ErpCouponPayload {
  code: string;
  subtotal: number;
  items: Array<{ sku: string; quantity: number; price: number }>;
}

export interface ErpCouponResult {
  valid: boolean;
  code: string;
  discount: number;
  discount_type: "fixed" | "percentage";
  message?: string;
}

export interface ErpOrderPayload {
  customer: {
    name: string;
    email: string;
    cpf_cnpj: string;
    phone: string;
  };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  items: Array<{
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  shipping: {
    method: string;
    service_id?: string;
    price: number;
  };
  payment: {
    method: string;
    status: "pending";
    payment_id?: string;
  };
  coupon_code?: string;
  discount?: number;
  source: "website";
  external_reference?: string;
}

export interface ErpOrderResult {
  order_id: string;
  external_reference: string;
  status: string;
}

export interface ErpOrderDetails {
  order_id: string;
  external_reference: string;
  status: string;
  payment_status: string;
  shipping: {
    carrier: string;
    tracking_code?: string;
    estimated_days: number;
  };
  invoice?: {
    number: string;
    series: string;
    key?: string;
    url?: string;
  };
  items: Array<{ sku: string; name: string; quantity: number; price: number }>;
  total: number;
  created_at: string;
}

export async function getProducts(): Promise<ErpProduct[]> {
  return erpFetch("/api/store/products");
}

export async function getProductBySlug(slug: string): Promise<ErpProduct> {
  return erpFetch(`/api/store/products/${slug}`);
}

export async function getStock(sku: string): Promise<ErpStock> {
  return erpFetch(`/api/store/stock/${sku}`);
}

export async function calculateShipping(
  payload: ErpShippingPayload
): Promise<ErpShippingOption[]> {
  return erpFetch("/api/store/shipping/calculate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function validateCoupon(
  payload: ErpCouponPayload
): Promise<ErpCouponResult> {
  return erpFetch("/api/store/coupon/validate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createOrder(
  payload: ErpOrderPayload
): Promise<ErpOrderResult> {
  return erpFetch("/api/store/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getOrder(orderId: string): Promise<ErpOrderDetails> {
  return erpFetch(`/api/store/order/${orderId}`);
}

export async function getTracking(orderId: string): Promise<{ tracking_code: string; carrier: string; url: string }> {
  return erpFetch(`/api/store/order/${orderId}/tracking`);
}

export { erpAvailable };
