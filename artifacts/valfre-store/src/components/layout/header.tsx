import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Phone, Heart, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";

const CATEGORIES = [
  {
    name: "Ferramentas Manuais",
    slug: "ferramentas-manuais",
    icon: "🔧",
    subs: ["Martelos","Alicates","Chaves","Arcos de Serra","Serrotes","Colheres de Pedreiro","Desempenadeiras","Estiletes","Aplicadores de Fita","Magnetizadores","Ferramentas Diversas","Politrizes","Ferramentas Magnéticas","Medição e Nivelamento","Organização de Ferramentas","Iluminação Portátil"],
  },
  {
    name: "Ferramentas Elétricas",
    slug: "ferramentas-eletricas",
    icon: "⚡",
    subs: ["Furadeiras","Parafusadeiras","Esmerilhadeiras","Serras Elétricas","Lixadeiras","Acessórios"],
  },
  {
    name: "Acessórios e Peças",
    slug: "acessorios",
    icon: "🔩",
    subs: ["Lâminas","Discos de Corte","Brocas","Mandris","Adaptadores","Extensões","Peças de Reposição"],
  },
  {
    name: "Construção e Obra",
    slug: "construcao",
    icon: "🧱",
    subs: ["Ferramentas Pedreiro","Ferramentas Pintura","Argamassa","Espátulas","Desempenadeiras","Soldagem"],
  },
  {
    name: "Elétrica",
    slug: "eletrica",
    icon: "💡",
    subs: ["Iluminação","Lâmpadas","Soquetes","Chuveiros","Disjuntores","Ebulidores","Extensões"],
  },
  {
    name: "Climatização",
    slug: "climatizacao",
    icon: "❄️",
    subs: ["Ventiladores","Climatizadores","Aquecedores","Refrigeração"],
  },
  {
    name: "Casa e Organização",
    slug: "casa",
    icon: "🏠",
    subs: ["Organizadores","Suportes","Cozinha","Utilidades"],
  },
  {
    name: "Automotivo",
    slug: "automotivo",
    icon: "🚗",
    subs: ["Lubrificantes","Aditivos","Manutenção"],
  },
  {
    name: "Ofertas",
    slug: "ofertas",
    icon: "🏷️",
    subs: ["Produtos promocionais"],
  },
];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function Header() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/categoria/busca?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col z-50 sticky top-0 shadow-lg">
        {/* Top Info Bar */}
        <div className="bg-primary text-primary-foreground/80 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full flex justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 font-bold text-secondary"><Phone className="w-3 h-3" /> (27) 99999-9999</span>
              <span className="opacity-40">|</span>
              <span>Seg-Sex: 8h às 18h</span>
              <span className="opacity-40">|</span>
              <span className="text-secondary font-semibold">Parcelamos em 12x</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://melhorrastreio.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Rastreie seu pedido</a>
              <span className="opacity-40">|</span>
              <Link href="/lojas" className="hover:text-secondary transition-colors">Nossas Lojas</Link>
              <span className="opacity-40">|</span>
              <Link href="/ajuda" className="hover:text-secondary transition-colors">Central de Ajuda</Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-primary text-primary-foreground py-4 px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
              <Link href="/">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ferramentas Valfre" className="h-10 md:h-12 object-contain" />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Digite o que você procura (ex: Furadeira, Bosch, Alicate...)"
                className="w-full bg-white text-foreground rounded-full border-0 h-12 focus-visible:ring-2 focus-visible:ring-secondary pl-12 pr-28 shadow-inner text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1 bottom-1 rounded-full bg-secondary hover:bg-secondary/90 border-0 px-6 font-bold shadow-sm">
                Buscar
              </Button>
            </form>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/login" className="hidden lg:flex items-center gap-2.5 hover:text-secondary transition-colors group cursor-pointer">
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-secondary/20 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-primary-foreground/70">Bem-vindo(a)</span>
                  <span className="text-sm font-bold">Entrar / Cadastrar</span>
                </div>
              </Link>
              <Link href="/favoritos" className="hidden md:flex items-center justify-center bg-white/10 hover:bg-secondary/20 p-2.5 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/carrinho" className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 px-4 py-2.5 rounded-full transition-all shadow-lg relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="hidden md:block text-sm font-bold text-white">Carrinho</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-secondary text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="Buscar ferramentas..."
                className="w-full bg-white text-foreground rounded-l-lg rounded-r-none border-0 h-10 pl-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none rounded-r-lg h-10 bg-secondary px-4">
                <Search className="w-4 h-4 text-white" />
              </Button>
            </form>
          </div>
        </div>

        {/* Nav bar */}
        <div className="bg-white border-b border-border hidden md:block shadow-sm">
          <div className="max-w-7xl mx-auto flex items-stretch h-13">
            {/* Mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="h-full px-6 font-bold flex items-center gap-2.5 bg-secondary text-white hover:bg-secondary/90 transition-colors text-sm whitespace-nowrap">
                <Menu className="w-4 h-4" />
                TODOS OS DEPARTAMENTOS
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {/* Mega dropdown */}
              {megaOpen && (
                <div className="absolute left-0 top-full z-50 flex shadow-2xl border border-slate-200 bg-white min-w-[760px] rounded-b-xl overflow-hidden">
                  {/* Left: category list */}
                  <div className="w-64 bg-slate-50 border-r border-slate-100 py-2">
                    {CATEGORIES.map((cat) => (
                      <div
                        key={cat.slug}
                        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm font-semibold transition-colors ${activeCategory.slug === cat.slug ? 'bg-secondary text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                        onMouseEnter={() => setActiveCategory(cat)}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{cat.icon}</span>
                          {cat.name}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </div>
                    ))}
                  </div>
                  {/* Right: subcategories */}
                  <div className="flex-1 p-6">
                    <h3 className="font-black text-primary text-sm uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
                      {activeCategory.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {activeCategory.subs.map((sub) => (
                        <Link
                          key={sub}
                          href={`/categoria/${activeCategory.slug}/${slugify(sub)}`}
                          className="text-sm text-slate-600 hover:text-secondary hover:translate-x-1 transition-all py-1.5 flex items-center gap-1.5 font-medium"
                          onClick={() => setMegaOpen(false)}
                        >
                          <ChevronRight className="w-3 h-3 text-slate-300" />
                          {sub}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <Link
                        href={`/categoria/${activeCategory.slug}`}
                        className="inline-flex items-center gap-1.5 text-secondary font-bold text-sm hover:underline"
                        onClick={() => setMegaOpen(false)}
                      >
                        Ver todos em {activeCategory.name} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <nav className="flex-1 px-6">
              <ul className="flex items-center gap-6 h-full text-[13px] font-bold text-foreground uppercase tracking-wide">
                <li>
                  <Link href="/categoria/ofertas" className="text-secondary hover:text-secondary/80 py-2 flex items-center gap-1.5 border-b-2 border-transparent hover:border-secondary transition-all">
                    🔥 Ofertas do Dia
                  </Link>
                </li>
                <li><Link href="/categoria/ferramentas-eletricas" className="hover:text-secondary py-2 block border-b-2 border-transparent hover:border-secondary transition-all">Elétricas</Link></li>
                <li><Link href="/categoria/ferramentas-manuais" className="hover:text-secondary py-2 block border-b-2 border-transparent hover:border-secondary transition-all">Manuais</Link></li>
                <li><Link href="/categoria/construcao" className="hover:text-secondary py-2 block border-b-2 border-transparent hover:border-secondary transition-all">Construção</Link></li>
                <li><Link href="/categoria/automotivo" className="hover:text-secondary py-2 block border-b-2 border-transparent hover:border-secondary transition-all">Automotivo</Link></li>
                <li><Link href="/ajuda" className="hover:text-secondary py-2 block border-b-2 border-transparent hover:border-secondary transition-all">Ajuda</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative bg-white w-80 max-h-screen overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-primary text-white">
              <span className="font-black text-base">DEPARTAMENTOS</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="border-b border-slate-100">
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center gap-3 px-5 py-3.5 font-semibold text-sm text-slate-700 hover:text-secondary hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{cat.icon}</span>
                  {cat.name}
                </Link>
                <div className="pl-12 pb-2">
                  {cat.subs.slice(0, 4).map((sub) => (
                    <Link
                      key={sub}
                      href={`/categoria/${cat.slug}/${slugify(sub)}`}
                      className="block text-xs text-slate-500 py-1 hover:text-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
