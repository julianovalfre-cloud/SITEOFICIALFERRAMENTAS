import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useListProducts, useGetFeaturedProducts, useListCategories } from "@workspace/api-client-react";
import { ArrowRight, Wrench, Zap, PaintRoller, ShieldCheck, Truck, CreditCard, Hammer, Clock, Star, Flame, Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
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
  const { data: featured, isLoading: isLoadingFeatured } = useGetFeaturedProducts();
  const { data: listBest, isLoading: isLoadingBest } = useListProducts({ limit: 4, sortBy: 'price_desc' });
  const { data: listNew, isLoading: isLoadingNew } = useListProducts({ limit: 4, sortBy: 'newest' });
  const { data: categories, isLoading: isLoadingCats } = useListCategories();

  const bestSellers = featured?.bestSellers?.length ? featured.bestSellers.slice(0,4) : listBest?.products?.slice(0,4) || [];
  const newArrivals = featured?.newArrivals?.length ? featured.newArrivals.slice(0,4) : listNew?.products?.slice(0,4) || [];

  // Fallback categories if API fails
  const displayCats = categories?.length ? categories.slice(0,8) : [
    { id: '1', slug: 'ferramentas-manuais', name: 'Manuais', icon: '🔧' },
    { id: '2', slug: 'ferramentas-eletricas', name: 'Elétricas', icon: '⚡' },
    { id: '3', slug: 'construcao', name: 'Construção', icon: '🧱' },
    { id: '4', slug: 'jardinagem', name: 'Jardinagem', icon: '🌱' },
    { id: '5', slug: 'medicao', name: 'Medição', icon: '📏' },
    { id: '6', slug: 'solda', name: 'Solda', icon: '🔥' },
    { id: '7', slug: 'epi', name: 'EPIs', icon: '🦺' },
    { id: '8', slug: 'acessorios', name: 'Acessórios', icon: '🔩' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      {/* Announcement Bar */}
      <div className="bg-secondary text-secondary-foreground overflow-hidden whitespace-nowrap h-10 flex items-center relative">
        <div className="animate-[marquee_20s_linear_infinite] flex whitespace-nowrap gap-16 md:gap-32 w-max text-sm font-bold">
          <span className="flex items-center gap-2"><Trophy className="w-4 h-4"/> 15.000+ Produtos em Estoque</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Frete GRÁTIS acima de R$ 199,00</span>
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> Parcele em até 12x sem juros</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4"/> Entrega expressa para SP Capital</span>
          {/* Duplicate for smooth scroll */}
          <span className="flex items-center gap-2"><Trophy className="w-4 h-4"/> 15.000+ Produtos em Estoque</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Frete GRÁTIS acima de R$ 199,00</span>
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> Parcele em até 12x sem juros</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4"/> Entrega expressa para SP Capital</span>
        </div>
      </div>

      <Header />
      
      <main className="flex-1">
        
        {/* NEW HERO SECTION */}
        <section className="relative bg-[#0b162c] pt-12 pb-16 md:py-20 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left pt-8 lg:pt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold tracking-wider mb-6">
                  <Flame className="w-4 h-4 fill-current" /> OFERTAS DE INVERNO
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 text-white tracking-tight drop-shadow-sm">
                  POTÊNCIA MÁXIMA <br className="hidden md:block"/>
                  PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-400">SUA OBRA</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  As melhores marcas de ferramentas elétricas e manuais com preços imbatíveis. Equipamentos profissionais para resultados perfeitos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-10 h-14 text-lg border-0 shadow-[0_8px_20px_rgba(232,101,26,0.3)] hover:-translate-y-1 transition-all rounded-xl">
                    Ver Ofertas
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white h-14 px-8 font-bold rounded-xl backdrop-blur-sm">
                    Explorar Categorias
                  </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-white/10 max-w-2xl mx-auto lg:mx-0">
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1">15k+</h4>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Produtos</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1 flex items-center justify-center lg:justify-start gap-1">4.9<Star className="w-5 h-5 text-amber-400 fill-current" /></h4>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Avaliações</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1">24h</h4>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Entrega Expressa</p>
                  </div>
                </div>
              </div>

              {/* Image Content */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-[1000px]">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=800&q=80" 
                    alt="Ferramentas Profissionais" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl animate-bounce-slow border border-slate-100 hidden md:flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Entrega Rápida</p>
                    <p className="text-sm font-extrabold text-slate-800">Todo o Brasil</p>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-2xl animate-pulse-slow border border-slate-100 hidden md:flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Compra Segura</p>
                    <p className="text-sm font-extrabold text-slate-800">100% Garantida</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white relative -mt-8 rounded-t-[40px] z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-extrabold text-primary mb-3">Encontre o que precisa</h2>
              <p className="text-muted-foreground font-medium">Navegue pelas nossas principais categorias</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {isLoadingCats ? (
                Array.from({length: 8}).map((_, i) => <Skeleton key={i} className="aspect-square rounded-2xl" />)
              ) : (
                displayCats.map((cat, i) => (
                  <Link key={i} href={`/categoria/${cat.slug}`} className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group border border-slate-100 cursor-pointer">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                      {cat.icon || '🔧'}
                    </div>
                    <span className="font-bold text-sm text-center leading-tight group-hover:text-white text-slate-700">{cat.name}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-secondary rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-display font-extrabold text-primary uppercase tracking-tight">
                    Mais Vendidos
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">Os queridinhos dos profissionais</p>
                </div>
              </div>
              <Link href="/categoria/destaques" className="text-secondary font-bold hover:bg-secondary/10 px-4 py-2 rounded-lg transition-colors flex items-center text-sm border border-secondary/20">
                Ver todos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {isLoadingBest ? (
              <ProductGridSkeleton />
            ) : bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {bestSellers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center text-muted-foreground border border-dashed border-border shadow-sm">
                Nenhum produto em destaque no momento.
              </div>
            )}
          </div>
        </section>
        
        {/* Promotional Banner */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-[32px] overflow-hidden relative min-h-[340px] flex items-center p-8 md:p-16 shadow-2xl bg-gradient-to-br from-primary via-[#1a3668] to-[#122445]">
               {/* Diagonal styling */}
               <div className="absolute top-0 right-0 w-[60%] h-full bg-secondary skew-x-12 translate-x-20 opacity-90 hidden md:block"></div>
               
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10">
                 <div className="max-w-lg text-white">
                   <Badge className="bg-white text-primary mb-6 hover:bg-white border-0 font-black tracking-widest px-3 py-1">SEMANA DO CONSUMIDOR</Badge>
                   <h2 className="text-5xl md:text-6xl font-display font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 drop-shadow-sm">ATÉ 60% OFF</h2>
                   <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-yellow-400">Em toda linha de Elétricas</h3>
                   <p className="mb-8 opacity-90 text-lg leading-relaxed font-medium">As melhores furadeiras, parafusadeiras e serras com preços que você nunca viu.</p>
                   
                   <div className="flex items-center gap-6">
                     <Button className="bg-secondary text-white border-0 hover:bg-white hover:text-secondary transition-all px-8 h-14 font-extrabold text-lg shadow-[0_0_20px_rgba(232,101,26,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-xl">
                       Aproveitar Agora
                     </Button>
                     <div className="hidden sm:flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                       <Clock className="w-5 h-5 text-secondary" />
                       <div className="font-mono font-bold text-lg tracking-wider">
                         2d 14h 32m
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="w-full max-w-[300px] md:max-w-[400px] relative z-10 perspective-[1000px]">
                   <img 
                     src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80" 
                     alt="Ferramenta em Promoção" 
                     className="w-full h-auto object-cover rounded-2xl shadow-2xl rotate-y-[-10deg] border-4 border-white/20"
                   />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-primary rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-display font-extrabold text-primary uppercase tracking-tight">
                    Novidades
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">Acabaram de chegar na loja</p>
                </div>
              </div>
              <Link href="/categoria/lancamentos" className="text-primary font-bold hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors flex items-center text-sm border border-primary/20">
                Ver lançamentos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {isLoadingNew ? (
              <ProductGridSkeleton />
            ) : newArrivals.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-12 text-center text-muted-foreground border border-dashed border-border">
                Nenhum lançamento no momento.
              </div>
            )}
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 bg-slate-100 border-t border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
              Trabalhamos com as melhores marcas
            </h2>
            <div className="flex overflow-x-auto pb-6 hide-scrollbar gap-6 snap-x snap-mandatory">
              {['Bosch', 'DeWalt', 'Makita', 'Tramontina', 'Stanley', 'Gedore', 'Black+Decker', 'Norton'].map((brand, i) => (
                <div key={i} className="snap-center shrink-0 w-40 h-20 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center hover:border-secondary hover:shadow-md transition-all cursor-pointer group">
                  <span className="font-display font-black text-2xl text-slate-300 group-hover:text-primary transition-colors tracking-tighter">
                    {brand.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// Add simple CSS for marquee
const style = document.createElement('style');
style.textContent = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-\\[marquee_20s_linear_infinite\\] {
    animation: marquee 30s linear infinite;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
