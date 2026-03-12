import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListProducts, useGetFeaturedProducts, useListCategories } from "@workspace/api-client-react";
import {
  ArrowRight, ShieldCheck,
  Truck, CreditCard, Clock, Star, Flame, Trophy, Phone, Package, ChevronLeft, ChevronRight
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "🔥 Ofertas Imperdíveis",
    title: "POTÊNCIA\nMÁXIMA\nSUA OBRA",
    titleHighlight: "SUA OBRA",
    subtitle: "As melhores marcas de ferramentas elétricas e manuais. Preços imbatíveis com entrega para todo o Brasil.",
    cta: "Ver Ofertas",
    ctaLink: "/categoria/ferramentas-eletricas",
    cta2: "Ver Categorias",
    cta2Link: "/categoria/ferramentas-manuais",
    img: "https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=800&q=80",
    bg: "from-[#0b162c] via-[#1a2d4f] to-[#0d2040]",
  },
  {
    id: 2,
    badge: "🏷️ Feirão de Inverno",
    title: "ATÉ 60%\nDE\nDESCONTO",
    titleHighlight: "DESCONTO",
    subtitle: "Ferramentas elétricas Bosch, Makita, DeWalt com os melhores preços da Grande Vitória. Aproveite enquanto dura!",
    cta: "Aproveitar Agora",
    ctaLink: "/categoria/ofertas",
    cta2: "Ver Elétricas",
    cta2Link: "/categoria/ferramentas-eletricas",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
    bg: "from-[#1a0b00] via-[#3d1a00] to-[#2a1200]",
  },
  {
    id: 3,
    badge: "🆕 Novidades 2026",
    title: "LINHA\nPROFISSIONAL\nCOMPLETA",
    titleHighlight: "COMPLETA",
    subtitle: "Conheça nossa linha completa de ferramentas manuais e acessórios. Qualidade profissional para qualquer projeto.",
    cta: "Ver Lançamentos",
    ctaLink: "/categoria/ferramentas-manuais",
    cta2: "Todos Produtos",
    cta2Link: "/categoria/todas",
    img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=800&q=80",
    bg: "from-[#0a1f0a] via-[#0d2b0d] to-[#061506]",
  },
];

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-border p-3 flex flex-col h-[340px]">
          <Skeleton className="w-full aspect-square rounded-lg mb-3" />
          <Skeleton className="w-1/3 h-2.5 mb-2" />
          <Skeleton className="w-full h-8 mb-3" />
          <div className="mt-auto">
            <Skeleton className="w-1/2 h-6 mb-2" />
            <Skeleton className="w-full h-9 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

const CATEGORY_IMAGES: Record<string, string> = {
  "ferramentas-manuais": "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=70",
  "ferramentas-eletricas": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=70",
  "construcao": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=70",
  "pintura": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&q=70",
  "eletrica": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&q=70",
  "medicao": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=70",
  "epi": "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=300&q=70",
  "acessorios": "https://images.unsplash.com/photo-1610414717393-a5d9a7fabb78?w=300&q=70",
  "automotivo": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&q=70",
  "jardinagem": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=70",
};

const FALLBACK_CATS = [
  { id: "1", slug: "ferramentas-manuais", name: "Ferramentas Manuais", icon: "🔧" },
  { id: "2", slug: "ferramentas-eletricas", name: "Ferramentas Elétricas", icon: "⚡" },
  { id: "3", slug: "construcao", name: "Construção", icon: "🧱" },
  { id: "4", slug: "pintura", name: "Pintura", icon: "🪣" },
  { id: "5", slug: "eletrica", name: "Elétrica", icon: "💡" },
  { id: "6", slug: "automotivo", name: "Automotivo", icon: "🚗" },
  { id: "7", slug: "epi", name: "EPIs / Segurança", icon: "🦺" },
  { id: "8", slug: "acessorios", name: "Acessórios", icon: "🔩" },
];

const BRANDS = ["Bosch", "DeWalt", "Makita", "Tramontina", "Stanley", "Gedore", "Black+Decker", "Norton", "Vonder", "Worker"];

export default function Home() {
  const { data: featured, isLoading: isLoadingFeatured } = useGetFeaturedProducts();
  const { data: listBest } = useListProducts({ limit: 5, sortBy: "price_desc" });
  const { data: listNew } = useListProducts({ limit: 5, sortBy: "newest" });
  const { data: categories, isLoading: isLoadingCats } = useListCategories();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = useCallback(() => setCurrentSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);
  const nextSlide = useCallback(() => setCurrentSlide(s => (s + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const bestSellers = featured?.bestSellers?.length
    ? featured.bestSellers.slice(0, 5)
    : listBest?.products?.slice(0, 5) || [];
  const newArrivals = featured?.newArrivals?.length
    ? featured.newArrivals.slice(0, 5)
    : listNew?.products?.slice(0, 5) || [];
  const displayCats = (categories?.length ? categories : FALLBACK_CATS).slice(0, 8);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ── Marquee Announcement Bar ── */}
      <div className="bg-secondary text-white overflow-hidden h-9 flex items-center relative shrink-0">
        <div className="animate-marquee flex whitespace-nowrap gap-20 w-max text-sm font-bold">
          <span className="flex items-center gap-2"><Trophy className="w-4 h-4" /> 15.000+ Produtos em Estoque</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete GRÁTIS acima de R$ 199,00</span>
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Parcelamos em 12x</span>
          <span className="flex items-center gap-2"><Flame className="w-4 h-4" /> Entrega expressa: Cariacica, Viana, Vitória e Serra</span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Televendas: (27) 99999-9999</span>
          <span className="flex items-center gap-2"><Trophy className="w-4 h-4" /> 15.000+ Produtos em Estoque</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete GRÁTIS acima de R$ 199,00</span>
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Parcelamos em 12x</span>
          <span className="flex items-center gap-2"><Flame className="w-4 h-4" /> Entrega expressa: Cariacica, Viana, Vitória e Serra</span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Televendas: (27) 99999-9999</span>
        </div>
      </div>

      <Header />

      <main className="flex-1">

        {/* ── HERO CAROUSEL (3 banners) ── */}
        <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
          {/* Slides */}
          <div className="relative w-full h-full">
            {HERO_SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${s.bg}`}>
                  <div className="absolute inset-0 opacity-30">
                    <img src={s.img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  </div>
                  <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                </div>
              </div>
            ))}

            {/* Content (animated per slide) */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-14 md:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 min-h-[480px]">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/25 text-secondary text-xs font-extrabold tracking-widest uppercase mb-5 transition-all duration-500">
                  {slide.badge}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] text-white mb-5 tracking-tight transition-all duration-500">
                  {slide.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line === slide.titleHighlight
                        ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-orange-400 to-yellow-400">{line}</span>
                        : line}
                      {i < slide.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-base md:text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href={slide.ctaLink}>
                    <Button size="lg" className="bg-secondary hover:bg-orange-600 text-white font-extrabold px-8 h-12 text-base border-0 shadow-[0_6px_24px_rgba(232,101,26,0.4)] transition-all rounded-xl w-full sm:w-auto">
                      {slide.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href={slide.cta2Link}>
                    <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white h-12 px-8 font-bold rounded-xl backdrop-blur-sm w-full sm:w-auto">
                      {slide.cta2}
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-8 mt-10 pt-8 border-t border-white/10 justify-center lg:justify-start">
                  {[["15k+","Produtos"],["4.9 ★","Avaliações"],["Grátis","Frete >R$199"]].map(([v,l]) => (
                    <div key={l} className="text-center lg:text-left">
                      <p className="text-2xl font-extrabold text-white">{v}</p>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative max-w-sm lg:max-w-none w-full hidden lg:block">
                <div className="rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6)] border border-white/10">
                  <img src={slide.img} alt="Ferramentas" className="w-full object-cover aspect-[4/3]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-5 -right-4 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Truck className="w-5 h-5 text-green-600" /></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase">Entrega Express</p><p className="text-sm font-extrabold text-slate-800">Grande Vitória</p></div>
                </div>
                <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-secondary" /></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase">Garantia</p><p className="text-sm font-extrabold text-slate-800">100% Segura</p></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/30 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/30 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20">
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-100">
            {[
              { icon: Truck, color: "text-blue-600 bg-blue-50", title: "Entrega Expressa", sub: "Para todo o Brasil" },
              { icon: CreditCard, color: "text-secondary bg-secondary/10", title: "Parcele em 12x", sub: "Sem juros no cartão" },
              { icon: ShieldCheck, color: "text-green-600 bg-green-50", title: "Compra Segura", sub: "100% protegida" },
              { icon: Package, color: "text-purple-600 bg-purple-50", title: "Troca Fácil", sub: "7 dias garantidos" },
            ].map(({ icon: Icon, color, title, sub }, i) => (
              <div key={i} className="flex items-center gap-3 justify-center py-1 first:pl-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES – Image Cards (lojadomecanico style) ── */}
        <section className="py-10 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary">Departamentos</h2>
                <p className="text-muted-foreground text-sm mt-0.5">Encontre o que precisa rapidamente</p>
              </div>
              <Link href="/categoria/todas" className="text-secondary text-sm font-bold hover:underline flex items-center gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {isLoadingCats
                ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)
                : displayCats.map((cat) => {
                  const imgSrc = CATEGORY_IMAGES[cat.slug] || `https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=70`;
                  return (
                    <Link
                      key={cat.id}
                      href={`/categoria/${cat.slug}`}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-secondary hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                        <img
                          src={imgSrc}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-white font-bold text-xs leading-tight text-center drop-shadow-md">
                          {cat.name}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-secondary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          VER
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

        {/* ── BEST SELLERS ── */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-9 bg-secondary rounded-full" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary uppercase tracking-tight">
                    Mais Vendidos
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5 font-medium">Os favoritos dos profissionais</p>
                </div>
              </div>
              <Link href="/categoria/destaques" className="hidden sm:flex items-center gap-1.5 text-secondary font-bold text-sm hover:bg-secondary/5 px-4 py-2 rounded-lg transition-colors border border-secondary/20">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoadingFeatured
              ? <ProductGridSkeleton />
              : bestSellers.length > 0
                ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
                  </div>
                )
                : (
                  <div className="bg-muted rounded-xl p-12 text-center text-muted-foreground border border-dashed">
                    Nenhum produto em destaque no momento.
                  </div>
                )
            }
          </div>
        </section>

        {/* ── PROMO BANNER ── */}
        <section className="py-6 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[300px] flex items-center shadow-xl">
              {/* BG layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b162c] via-primary to-[#1a3668]" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=75"
                  alt="Ferramentas em Promoção"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-14 max-w-2xl">
                <Badge className="bg-secondary text-white border-0 font-extrabold tracking-widest text-xs mb-5 px-3 py-1">
                  SEMANA DO CONSUMIDOR
                </Badge>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-2 leading-none tracking-tight">
                  ATÉ 60% OFF
                </h2>
                <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-5">
                  Em toda linha de Ferramentas Elétricas
                </h3>
                <p className="text-slate-300 mb-7 text-sm leading-relaxed max-w-md">
                  As melhores furadeiras, parafusadeiras e serras com preços que você nunca viu. Aproveite antes que acabe!
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/categoria/ferramentas-eletricas">
                    <Button className="bg-secondary hover:bg-orange-600 text-white font-extrabold px-8 h-12 text-base shadow-[0_0_24px_rgba(232,101,26,0.5)] hover:shadow-[0_0_32px_rgba(232,101,26,0.7)] transition-all rounded-xl border-0">
                      Aproveitar Agora
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-mono font-bold text-white tracking-wider text-sm">2d 14h 32m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEW ARRIVALS ── */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-9 bg-primary rounded-full" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary uppercase tracking-tight">
                    Novidades
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5 font-medium">Acabaram de chegar</p>
                </div>
              </div>
              <Link href="/categoria/lancamentos" className="hidden sm:flex items-center gap-1.5 text-primary font-bold text-sm hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20">
                Ver lançamentos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoadingFeatured
              ? <ProductGridSkeleton />
              : newArrivals.length > 0
                ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
                  </div>
                )
                : (
                  <div className="bg-slate-50 rounded-xl p-12 text-center text-muted-foreground border border-dashed">
                    Nenhum lançamento no momento.
                  </div>
                )
            }
          </div>
        </section>

        {/* ── 2-COLUMN BANNERS ── */}
        <section className="py-8 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/categoria/epi" className="group relative rounded-2xl overflow-hidden h-44 shadow-md hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=600&q=70" alt="EPIs" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
              <div className="absolute inset-0 flex flex-col justify-center p-7">
                <Badge className="bg-secondary text-white border-0 font-bold text-xs w-fit mb-2">DESTAQUE</Badge>
                <h3 className="text-white font-display font-extrabold text-2xl mb-1 leading-tight">EPIs & Segurança</h3>
                <p className="text-white/80 text-sm">Proteja-se com o melhor equipamento</p>
              </div>
            </Link>
            <Link href="/categoria/automotivo" className="group relative rounded-2xl overflow-hidden h-44 shadow-md hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=70" alt="Automotivo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111]/90 to-[#111]/40" />
              <div className="absolute inset-0 flex flex-col justify-center p-7">
                <Badge className="bg-secondary text-white border-0 font-bold text-xs w-fit mb-2">NOVO</Badge>
                <h3 className="text-white font-display font-extrabold text-2xl mb-1 leading-tight">Linha Automotiva</h3>
                <p className="text-white/80 text-sm">Ferramentas para mecânicos profissionais</p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── BRANDS STRIP ── */}
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-[0.25em] mb-7">
              Trabalhamos com as melhores marcas do mercado
            </p>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="shrink-0 h-14 px-6 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center hover:border-secondary hover:bg-secondary/5 hover:shadow-md transition-all cursor-pointer group"
                >
                  <span className="font-display font-black text-lg text-slate-300 group-hover:text-primary transition-colors tracking-tighter whitespace-nowrap">
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
