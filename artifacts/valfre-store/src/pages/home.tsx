import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useListProducts, useGetFeaturedProducts } from "@workspace/api-client-react";
import { ArrowRight, Wrench, Zap, PaintRoller, ShieldCheck, Truck, CreditCard, Hammer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border p-4 flex flex-col h-[400px]">
          <Skeleton className="w-full aspect-square rounded-xl mb-4" />
          <Skeleton className="w-1/3 h-3 mb-2" />
          <Skeleton className="w-full h-10 mb-4" />
          <div className="mt-auto">
            <Skeleton className="w-1/2 h-6 mb-3" />
            <Skeleton className="w-full h-10 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  // We use listProducts as a fallback if featured endpoint is not seeded
  const { data: featured, isLoading: isLoadingFeatured } = useGetFeaturedProducts();
  const { data: list, isLoading: isLoadingList } = useListProducts({ limit: 10 });

  const displayProducts = featured?.bestSellers?.length ? featured.bestSellers : list?.products || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary overflow-hidden h-[400px] md:h-[500px]">
          <div className="absolute inset-0">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-tools.png`} 
              alt="Ferramentas Valfre Banner" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-[url('/images/pattern-industrial.png')] opacity-10 bg-repeat" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
                ESPECIAL MÊS DO PROFISSIONAL
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 text-white drop-shadow-lg">
                POTÊNCIA MÁXIMA PARA <br/><span className="text-secondary">SUA OBRA</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                As melhores marcas de ferramentas elétricas e manuais com preços imbatíveis. Parcele suas compras em até 12x sem juros.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 h-14 text-lg border-0 shadow-[0_0_20px_rgba(232,101,26,0.4)]">
                  Ver Ofertas
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 h-14">
                  Marcas Parceiras
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b border-border py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Entrega Expressa</h4>
                <p className="text-sm text-muted-foreground">Para todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Parcele em até 12x</h4>
                <p className="text-sm text-muted-foreground">No cartão de crédito</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Compra Segura</h4>
                <p className="text-sm text-muted-foreground">Garantia de fábrica</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Quick Links */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">Navegue por Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Manuais", icon: Wrench, color: "bg-blue-100 text-blue-600" },
                { name: "Elétricas", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
                { name: "Pintura", icon: PaintRoller, color: "bg-green-100 text-green-600" },
                { name: "Construção", icon: Hammer, color: "bg-orange-100 text-orange-600" },
              ].map((cat, i) => (
                <Link key={i} href={`/categoria/${cat.name.toLowerCase()}`} className="bg-white rounded-2xl p-6 border border-border flex flex-col items-center justify-center gap-4 hover:border-primary hover:shadow-lg transition-all group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary">{cat.name}</span>
                </Link>
              ))}
              {/* Fill remaining space */}
               <Link href="/categoria/todas" className="bg-primary rounded-2xl p-6 border border-primary flex flex-col items-center justify-center gap-4 hover:bg-primary/90 transition-all group col-span-2">
                  <span className="font-bold text-white flex items-center gap-2">
                    Ver Todos os Departamentos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-primary uppercase tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-secondary rounded-full"></div>
                Destaques da Semana
              </h2>
              <Link href="/categoria/destaques" className="text-secondary font-bold hover:underline flex items-center text-sm">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {isLoadingFeatured && isLoadingList ? (
              <ProductGridSkeleton />
            ) : displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {displayProducts.slice(0, 5).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-2xl p-12 text-center text-muted-foreground border border-dashed border-border">
                Nenhum produto em destaque no momento.
              </div>
            )}
          </div>
        </section>
        
        {/* Banner Middle */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary rounded-3xl overflow-hidden relative h-[250px] flex items-center p-12 border-4 border-secondary">
               <div className="absolute inset-0 bg-[url('/images/pattern-industrial.png')] opacity-10 bg-repeat" />
               <div className="relative z-10 max-w-lg text-white">
                 <h2 className="text-4xl font-display font-bold mb-4">FEIRÃO DE BATERIAS</h2>
                 <p className="mb-6 opacity-90">Compre ferramentas selecionadas e ganhe 50% de desconto na segunda bateria original.</p>
                 <Button className="bg-secondary text-white border-0 hover:bg-white hover:text-secondary transition-colors px-8 font-bold">
                   Aproveitar Promoção
                 </Button>
               </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
