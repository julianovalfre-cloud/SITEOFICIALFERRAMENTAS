import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useGetOrder } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink, Package, MapPin, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderPage() {
  const [, params] = useRoute("/pedido/:id");
  const id = params?.id || "";

  const { data: order, isLoading, isError } = useGetOrder(id, { query: { retry: false } });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col items-center">
          <Skeleton className="w-24 h-24 rounded-full mb-8" />
          <Skeleton className="w-64 h-10 mb-4" />
          <Skeleton className="w-full h-64 rounded-2xl mb-8" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Pedido não encontrado</h2>
            <p className="text-muted-foreground mb-6">Verifique se o link está correto.</p>
            <Link href="/"><Button>Voltar para a Loja</Button></Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        
        <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Pedido Confirmado!</h1>
          <p className="text-lg text-muted-foreground">
            Obrigado pela sua compra, {order.customer.name.split(' ')[0]}.<br/>
            Seu número de pedido é <strong className="text-foreground">#{order.id}</strong>
          </p>
        </div>

        {/* Action Required (PIX/Boleto) */}
        {order.paymentStatus === 'pending' && order.paymentMethod === 'pix' && (
          <div className="bg-card rounded-2xl border-2 border-secondary p-8 text-center shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">AÇÃO NECESSÁRIA</div>
            <h3 className="text-2xl font-bold mb-2">Pague seu PIX</h3>
            <p className="text-muted-foreground mb-6">Escaneie o QR Code abaixo ou copie o código PIX Copia e Cola.</p>
            
            <div className="w-48 h-48 mx-auto bg-white border-4 border-muted p-2 rounded-xl mb-6">
              {/* Fake QR code generation using a public API for demo purposes based on random string */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=valfre-store-mock-pix-${order.id}`} alt="QR Code PIX" className="w-full h-full" />
            </div>
            
            <div className="max-w-md mx-auto relative">
              <input 
                type="text" 
                readOnly 
                value="00020126580014br.gov.bcb.pix0136mock-pix-code-do-not-pay-this-is-a-demo-520400005303986540510.005802BR5913Valfre Store6009Sao Paulo62070503***6304EE88" 
                className="w-full bg-muted pr-12 pl-4 py-3 rounded-lg border border-border text-xs font-mono text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 text-primary hover:bg-primary/10"
                onClick={() => copyToClipboard("00020126580014br.gov.bcb.pix0136mock-pix-code")}
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Order Details */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <Package className="w-5 h-5 text-primary" /> Itens do Pedido
              </h3>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.productId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-muted rounded border border-border p-1 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-sm">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 text-primary">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <MapPin className="w-5 h-5 text-primary" /> Endereço de Entrega
              </h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p className="font-bold text-foreground">{order.customer.name}</p>
                <p>Av. Exemplo de Endereço, 1234 - Apto 56</p>
                <p>Bairro Industrial - São Paulo / SP</p>
                <p>CEP: 00000-000</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <CreditCard className="w-5 h-5 text-primary" /> Informações de Pagamento
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método</span>
                  <span className="font-bold uppercase">{order.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-bold text-amber-600 uppercase">{order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg" className="bg-primary text-white font-bold">Voltar para a Página Inicial</Button>
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
