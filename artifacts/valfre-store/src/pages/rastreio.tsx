import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { getErpOrder, getTracking } from "@/services/erpApi";
import type { ErpOrderDetails } from "@/services/erpApi";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ExternalLink,
  Search,
  Copy,
  Receipt,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  pending:    { label: "Aguardando Pagamento", color: "text-yellow-700",  icon: <Clock className="w-5 h-5" />,        bg: "bg-yellow-50 border-yellow-200" },
  approved:   { label: "Pagamento Aprovado",   color: "text-blue-700",   icon: <CheckCircle2 className="w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
  processing: { label: "Em Separação",         color: "text-indigo-700", icon: <Package className="w-5 h-5" />,      bg: "bg-indigo-50 border-indigo-200" },
  shipped:    { label: "Em Trânsito",          color: "text-orange-700", icon: <Truck className="w-5 h-5" />,        bg: "bg-orange-50 border-orange-200" },
  delivered:  { label: "Entregue",             color: "text-green-700",  icon: <CheckCircle2 className="w-5 h-5" />, bg: "bg-green-50 border-green-200" },
  cancelled:  { label: "Cancelado",            color: "text-red-700",    icon: <XCircle className="w-5 h-5" />,      bg: "bg-red-50 border-red-200" },
};

const TIMELINE_STEPS = [
  { key: "pending",    label: "Pedido Realizado" },
  { key: "approved",   label: "Pagamento Aprovado" },
  { key: "processing", label: "Em Separação" },
  { key: "shipped",    label: "Em Trânsito" },
  { key: "delivered",  label: "Entregue" },
];

function stepIndex(status: string) {
  return TIMELINE_STEPS.findIndex(s => s.key === status);
}

export default function RastreioPage() {
  const [matchId, params] = useRoute("/rastreio/:id");
  const [, setLocation] = useLocation();
  const [searchInput, setSearchInput] = useState(params?.id || "");
  const [orderId, setOrderId] = useState(params?.id || "");
  const [order, setOrder] = useState<ErpOrderDetails | null>(null);
  const [tracking, setTracking] = useState<{ tracking_code: string | null; carrier: string; url: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId) loadOrder(orderId);
  }, [orderId]);

  async function loadOrder(id: string) {
    setLoading(true);
    setError(null);
    setOrder(null);
    setTracking(null);
    try {
      const [orderData, trackingData] = await Promise.allSettled([
        getErpOrder(id),
        getTracking(id),
      ]);
      if (orderData.status === "fulfilled") setOrder(orderData.value);
      else setError("Pedido não encontrado. Verifique o número e tente novamente.");
      if (trackingData.status === "fulfilled") setTracking(trackingData.value);
    } catch {
      setError("Pedido não encontrado. Verifique o número e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const id = searchInput.trim();
    setOrderId(id);
    setLocation(`/rastreio/${id}`);
  }

  function copyTracking() {
    if (tracking?.tracking_code) {
      navigator.clipboard.writeText(tracking.tracking_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const statusCfg = order ? (STATUS_CONFIG[order.status] || STATUS_CONFIG["pending"]) : null;
  const currentStep = order ? stepIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Search bar */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
          <h1 className="text-2xl font-display font-bold mb-2">Rastrear Pedido</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Digite o número do seu pedido (ex: VF-2026-001) para acompanhar a entrega.
          </p>
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              placeholder="Número do pedido..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="flex-1 h-12"
            />
            <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Rastrear
            </Button>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p>Buscando pedido...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 flex items-center gap-4">
            <XCircle className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-bold">Pedido não encontrado</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {order && !loading && statusCfg && (
          <div className="space-y-6">

            {/* Status Banner */}
            <div className={`rounded-2xl border p-6 flex items-center gap-4 ${statusCfg.bg}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border ${statusCfg.color.replace("text-", "border-")}`}>
                <span className={statusCfg.color}>{statusCfg.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Status do Pedido #{order.order_id}
                </p>
                <p className={`text-xl font-bold ${statusCfg.color}`}>{statusCfg.label}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pedido em {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>

            {/* Timeline */}
            {order.status !== "cancelled" && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-display font-bold text-lg mb-6">Acompanhamento</h2>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {TIMELINE_STEPS.map((step, i) => {
                      const done = i <= currentStep;
                      const active = i === currentStep;
                      return (
                        <div key={step.key} className="relative flex items-center gap-4 pl-12">
                          <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${done ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground"}`}>
                            {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                          </div>
                          <div>
                            <p className={`font-semibold ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
                              {step.label}
                            </p>
                            {active && <p className="text-xs text-muted-foreground mt-0.5">Status atual</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Shipping & Tracking */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Informações de Entrega
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Transportadora</p>
                  <p className="font-bold">{order.shipping.carrier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Prazo estimado</p>
                  <p className="font-bold">
                    {order.shipping.estimated_days === 0
                      ? "Retirada na loja"
                      : `${order.shipping.estimated_days} dias úteis`}
                  </p>
                </div>
              </div>

              {tracking?.tracking_code && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-2">Código de Rastreamento</p>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-muted px-4 py-3 rounded-lg font-mono font-bold text-sm border border-border">
                      {tracking.tracking_code}
                    </code>
                    <Button size="sm" variant="outline" onClick={copyTracking}>
                      <Copy className="w-4 h-4 mr-1" />
                      {copied ? "Copiado!" : "Copiar"}
                    </Button>
                    {tracking.url && (
                      <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                        <a href={tracking.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Rastrear
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {!tracking?.tracking_code && order.status !== "pending" && (
                <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                  O código de rastreamento será disponibilizado após a postagem do produto.
                </p>
              )}
            </div>

            {/* Invoice (NF-e) */}
            {order.invoice && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  Nota Fiscal
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Número / Série</p>
                    <p className="font-bold">{order.invoice.number} / {order.invoice.series}</p>
                  </div>
                  {order.invoice.key && (
                    <div>
                      <p className="text-muted-foreground mb-1">Chave NF-e</p>
                      <p className="font-mono text-xs break-all">{order.invoice.key}</p>
                    </div>
                  )}
                </div>
                {order.invoice.url && (
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <a href={order.invoice.url} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Baixar NF-e
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-display font-bold text-lg mb-4">Itens do Pedido</h2>
              <div className="space-y-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-muted-foreground text-xs">SKU: {item.sku} · Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total do Pedido</span>
                <span className="text-primary">{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* Help block */}
            <div className="text-center text-sm text-muted-foreground py-4">
              Dúvidas? Fale pelo{" "}
              <a href="https://wa.me/5527999999999" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                WhatsApp (27) 99999-9999
              </a>{" "}
              ou acesse nossa{" "}
              <a href="/ajuda" className="text-primary font-semibold hover:underline">Central de Ajuda</a>.
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
