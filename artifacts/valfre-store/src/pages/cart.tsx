import { Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  const handleUpdateQuantity = (productId: string, newQtd: number) => {
    if (newQtd < 1) return;
    updateQuantity(productId, newQtd);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  const hasItems = cart && cart.items.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
        <h1 className="text-3xl font-display font-bold text-primary mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-secondary" /> Meu Carrinho
        </h1>

        {!hasItems ? (
          <div className="bg-card rounded-3xl border border-border p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Explore nossos departamentos e adicione os melhores produtos para sua obra ou projeto.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary text-white font-bold px-8 h-14 text-lg">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Items List */}
            <div className="lg:col-span-2 bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-6">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-border last:border-0 last:pb-0">
                    
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl border border-border p-2 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded">img</div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <Link href={`/produto/${item.productId}`} className="font-bold text-lg hover:text-secondary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <div className="text-xl font-display font-bold text-primary">
                        {formatCurrency(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end w-full sm:w-auto">
                      <div className="flex items-center border border-input rounded-lg bg-white overflow-hidden h-10">
                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} className="w-10 h-full flex items-center justify-center hover:bg-muted text-foreground">
                          -
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity}
                          readOnly
                          className="w-12 h-full text-center font-bold border-x border-input appearance-none bg-transparent"
                        />
                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-muted text-foreground">
                          +
                        </button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(item.productId)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remover
                      </Button>
                    </div>

                  </div>
                ))}
              </div>
              <div className="bg-muted/30 p-4 border-t border-border flex justify-between items-center px-8">
                <Link href="/">
                  <Button variant="outline" className="font-bold bg-white">
                    Adicionar mais produtos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-primary mb-6 pb-4 border-b border-border">Resumo do Pedido</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({cart.itemCount} itens)</span>
                    <span className="font-medium text-foreground">{formatCurrency(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Descontos</span>
                    <span className="font-medium text-green-600">R$ 0,00</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-end">
                    <span className="font-bold text-lg">Total</span>
                    <div className="text-right">
                      <span className="font-display text-3xl font-bold text-primary leading-none block">
                        {formatCurrency(cart.total)}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">Em até 12x sem juros</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/25 gap-2">
                    Continuar para Pagamento <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border flex items-center gap-3 text-sm text-muted-foreground justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" /> Ambiente 100% Seguro
                </div>
              </div>

              {/* Coupon */}
              <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-3">
                <h4 className="font-bold flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> Cupom de Desconto</h4>
                <div className="flex gap-2">
                  <Input placeholder="Digite seu cupom" className="bg-white" />
                  <Button variant="outline" className="border-primary text-primary">Aplicar</Button>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
