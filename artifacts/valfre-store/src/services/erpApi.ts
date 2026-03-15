const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
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

export interface ErpShippingOption {
  id: string;
  name: string;
  price: number;
  days: number;
  carrier: string;
  service_id?: string;
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
    tracking_code?: string | null;
    estimated_days: number;
  };
  invoice?: {
    number: string;
    series: string;
    key?: string;
    url?: string;
  } | null;
  items: Array<{ sku: string; name: string; quantity: number; price: number }>;
  total: number;
  created_at: string;
}

export function getStock(sku: string): Promise<ErpStock> {
  return apiFetch(`/api/store/stock/${encodeURIComponent(sku)}`);
}

export function calculateShipping(
  cepDestino: string,
  products: ErpShippingProduct[]
): Promise<{ options: ErpShippingOption[] }> {
  return apiFetch("/api/store/shipping/calculate", {
    method: "POST",
    body: JSON.stringify({ cepDestino, products }),
  });
}

export function validateCoupon(
  code: string,
  subtotal: number,
  items: Array<{ sku: string; quantity: number; price: number }>
): Promise<ErpCouponResult> {
  return apiFetch("/api/store/coupon/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal, items }),
  });
}

export function createErpOrder(payload: ErpOrderPayload): Promise<ErpOrderResult> {
  return apiFetch("/api/store/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getErpOrder(orderId: string): Promise<ErpOrderDetails> {
  return apiFetch(`/api/store/order/${encodeURIComponent(orderId)}`);
}

export function getTracking(orderId: string): Promise<{ tracking_code: string | null; carrier: string; url: string | null }> {
  return apiFetch(`/api/store/order/${encodeURIComponent(orderId)}/tracking`);
}
