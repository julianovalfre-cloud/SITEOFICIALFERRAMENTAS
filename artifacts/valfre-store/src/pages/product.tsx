import { useState } from "react";
import { useRoute } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { useGetProduct, useGetRelatedProducts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Minus, Plus, ShoppingCart, Truck, Shield, Star, Award } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function Product() {
  const [, params] = useRoute("/produto/:id");
  const id = params?.id || "";

  const { data: product, isLoading } = useGetProduct(id);
  const { data: related } = useGetRelatedProducts(id);
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-1/2" />
              <Skeleton className="h-12 w-full mt-10" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Produto não encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="hover:text-primary cursor-pointer">{product.category}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-semibold text-foreground truncate max-w-[200px] md:max-w-md">{product.name}</span>
        </div>

        {/* Main Product Area */}
        <div className="bg-card rounded-3xl border border-border p-6 md:p-10 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square bg-white border border-border rounded-2xl p-8 flex items-center justify-center relative">
                {product.discountPercent && product.discountPercent > 0 && (
                  <Badge className="absolute top-4 left-4 bg-secondary hover:bg-secondary text-lg px-3 py-1 font-bold">
                    -{product.discountPercent}% OFF
                  </Badge>
                )}
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" />
                ) : (
                  <div className="text-muted-foreground">Sem imagem</div>
                )}
              </div>
              {/* Thumbnails if multiple images exist */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-4">
                  {product.images.map((img, i) => (
                    <div key={i} className={`aspect-square border-2 rounded-xl p-2 cursor-pointer bg-white ${i === 0 ? 'border-secondary' : 'border-border'}`}>
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">{product.brand || 'Valfre'}</span>
                <span className="text-muted-foreground">SKU: {product.sku}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground underline cursor-pointer">
                  ({product.reviewCount || 0} avaliações)
                </span>
              </div>

              <div className="mb-8">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-muted-foreground line-through text-lg mb-1">
                    {formatCurrency(product.originalPrice)}
                  </div>
                )}
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-5xl font-display font-bold text-primary leading-none">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-lg font-bold text-secondary mb-1">à vista</span>
                </div>
                <p className="text-muted-foreground">
                  ou em até <strong className="text-foreground">10x de {formatCurrency(product.price / 10)}</strong> sem juros no cartão
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="font-bold">{product.inStock ? 'Produto em Estoque' : 'Produto Indisponível'}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-input rounded-lg bg-white overflow-hidden h-14 shrink-0">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-muted transition-colors text-foreground">
                      <Minus className="w-4 h-4" />
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 h-full text-center font-bold border-x border-input appearance-none bg-transparent"
                    />
                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-muted transition-colors text-foreground">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30 gap-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>

              {/* Shipping Calculator */}
              <div className="border border-border rounded-xl p-5 mb-8">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-primary" /> Calcule frete e prazo
                </h3>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Digite seu CEP" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 bg-white h-11"
                  />
                  <Button variant="outline" className="h-11 px-6 border-primary text-primary hover:bg-primary/5">Calcular</Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Shield className="w-8 h-8 text-green-600 stroke-[1.5]" />
                  <span>Compra 100%<br/>Segura</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Award className="w-8 h-8 text-primary stroke-[1.5]" />
                  <span>Garantia do<br/>Fabricante</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="bg-card rounded-3xl border border-border p-6 md:p-10 mb-16">
          <Tabs defaultValue="desc">
            <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent gap-8 mb-8">
              <TabsTrigger value="desc" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg py-4 px-0">
                Descrição do Produto
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg py-4 px-0">
                Especificações Técnicas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="desc" className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              {product.longDescription || product.description || "Nenhuma descrição detalhada disponível para este produto."}
            </TabsContent>
            <TabsContent value="specs">
              {product.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-3 border-b border-border ${i % 2 === 0 ? '' : ''}`}>
                      <span className="font-bold text-foreground">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhuma especificação cadastrada.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related && related.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-primary uppercase tracking-tight flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-secondary rounded-full"></div>
              Quem comprou, levou também
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {related.slice(0, 5).map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
