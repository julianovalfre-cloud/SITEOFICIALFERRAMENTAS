import { ShoppingCart, Search, Menu, Zap, Truck, Shield, Star, ArrowRight, Hammer, Wrench, ChevronRight } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto 3/8\" 650W", brand: "BOSCH", price: 289.90, oldPrice: 349.90, discount: 17, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=70", rating: 4.8, reviews: 312 },
  { id: 2, name: "Esmerilhadeira Angular 4.1/2\"", brand: "DEWALT", price: 379.90, oldPrice: 459.90, discount: 17, img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=70", rating: 4.9, reviews: 198 },
  { id: 3, name: "Parafusadeira/Furadeira a Bateria 12V", brand: "MAKITA", price: 499.90, oldPrice: 599.90, discount: 16, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=70", rating: 5.0, reviews: 421 },
  { id: 4, name: "Jogo de Chaves Combinadas 8-24mm", brand: "GEDORE", price: 156.90, oldPrice: 189.90, discount: 17, img: "https://images.unsplash.com/photo-1610414717393-a5d9a7fabb78?w=300&q=70", rating: 4.7, reviews: 86 },
];

const CATS = [
  { name: "ELÉTRICAS", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&q=60" },
  { name: "MANUAIS", img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=200&q=60" },
  { name: "CONSTRUÇÃO", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&q=60" },
  { name: "SOLDA", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&q=60" },
  { name: "AUTOMOTIVO", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&q=60" },
  { name: "EPIs", img: "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=200&q=60" },
];

export function IndustrialDark() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-['Inter',sans-serif] overflow-x-hidden">

      {/* Top tape strip */}
      <div className="h-2 bg-[repeating-linear-gradient(45deg,#FFD700,#FFD700_10px,#111111_10px,#111111_20px)]" />

      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-4 px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#FFD700] flex items-center justify-center rounded">
              <Hammer className="w-6 h-6 text-[#111]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#FFD700] tracking-[0.3em] uppercase">Ferramentas</div>
              <div className="text-lg font-black tracking-widest text-white uppercase leading-none">VALFRE</div>
            </div>
          </div>

          <div className="flex-1 flex bg-[#2a2a2a] border border-[#444] rounded overflow-hidden mx-6">
            <input className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-[#666] outline-none" placeholder="Buscar ferramentas, peças, acessórios..." />
            <button className="bg-[#FFD700] px-5 flex items-center justify-center hover:bg-yellow-400 transition-colors">
              <Search className="w-5 h-5 text-[#111]" />
            </button>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-sm">
            <div className="text-center cursor-pointer hover:text-[#FFD700] transition-colors">
              <div className="text-xs text-[#888]">Entre ou</div>
              <div className="font-bold">Cadastre-se</div>
            </div>
            <div className="relative cursor-pointer hover:text-[#FFD700] transition-colors">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#FFD700] text-[#111] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="border-t border-[#2a2a2a] bg-[#141414]">
          <div className="max-w-7xl mx-auto px-6 flex items-stretch">
            <button className="flex items-center gap-2 bg-[#FFD700] text-[#111] font-black text-sm px-5 py-3 uppercase tracking-wider hover:bg-yellow-400 transition-colors">
              <Menu className="w-4 h-4" /> DEPARTAMENTOS
            </button>
            {["OFERTAS DO DIA", "MARCAS", "LANÇAMENTOS", "OUTLET"].map(n => (
              <a key={n} href="#" className="px-5 py-3 text-xs font-bold text-[#aaa] hover:text-[#FFD700] hover:bg-[#1f1f1f] transition-colors tracking-wider border-l border-[#2a2a2a]">{n}</a>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d0d0d] border-b-4 border-[#FFD700]">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=60')", backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}} />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-[60px] bg-[#FFD700]" />
              <span className="text-[#FFD700] text-xs font-black tracking-[0.4em] uppercase">Ferramentas Pro</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tight mb-6 text-white" style={{fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em'}}>
              PODER<br />
              <span className="text-[#FFD700]">REAL</span><br />
              NAS MÃOS
            </h1>
            <p className="text-[#999] text-lg mb-8 max-w-lg leading-relaxed">
              Ferramentas profissionais para quem trabalha de verdade. Sem concessões. Sem compromisso com o medíocre.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#FFD700] text-[#111] font-black px-8 py-4 uppercase tracking-wider text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2">
                VER OFERTAS <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-[#444] text-white font-bold px-8 py-4 uppercase tracking-wider text-sm hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
                CATÁLOGO
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-[#2a2a2a]">
              {[["15K+", "PRODUTOS"], ["4.9★", "AVALIAÇÃO"], ["24H", "ENTREGA SP"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-[#FFD700]">{n}</div>
                  <div className="text-[10px] text-[#666] tracking-[0.3em] font-bold mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 flex divide-x divide-[#2a2a2a]">
          {[[Truck, "Entrega Expressa", "Para todo o Brasil"], [Shield, "Garantia Total", "Direto do fabricante"], [Zap, "Parcele em 12x", "Sem juros"]].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-center gap-3 px-8 py-4 first:pl-0">
              <Icon className="w-5 h-5 text-[#FFD700] shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">{t as string}</div>
                <div className="text-xs text-[#666]">{s as string}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-10 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-6 bg-[#FFD700]" />
            <h2 className="text-sm font-black tracking-[0.3em] text-[#888] uppercase">Departamentos</h2>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {CATS.map((c) => (
              <div key={c.name} className="group relative overflow-hidden border border-[#2a2a2a] hover:border-[#FFD700] transition-all cursor-pointer">
                <div className="aspect-square overflow-hidden bg-[#1a1a1a]">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-black tracking-[0.2em] text-white group-hover:text-[#FFD700] transition-colors">{c.name}</span>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-[#FFD700]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 bg-[#0d0d0d] border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-[#FFD700]" />
              <div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white">Mais Vendidos</h2>
                <p className="text-xs text-[#666] tracking-wider mt-0.5">Os favoritos dos profissionais</p>
              </div>
            </div>
            <a href="#" className="text-[#FFD700] text-xs font-bold tracking-wider hover:underline flex items-center gap-1">
              VER TODOS <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.id} className="group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#FFD700] transition-all cursor-pointer relative overflow-hidden">
                {p.discount > 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-[#FFD700] text-[#111] text-[10px] font-black px-2 py-1 uppercase tracking-wider">
                    -{p.discount}% OFF
                  </div>
                )}
                <div className="aspect-square overflow-hidden bg-[#222] p-4">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-4 border-t border-[#2a2a2a]">
                  <div className="text-[10px] font-black tracking-[0.25em] text-[#FFD700] mb-2">{p.brand}</div>
                  <div className="text-sm font-semibold text-[#ccc] mb-3 line-clamp-2 leading-snug group-hover:text-white transition-colors">{p.name}</div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? 'text-[#FFD700] fill-[#FFD700]' : 'text-[#444]'}`} />)}
                    <span className="text-[10px] text-[#666] ml-1">({p.reviews})</span>
                  </div>
                  {p.oldPrice && <div className="text-xs text-[#666] line-through mb-0.5">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</div>}
                  <div className="text-2xl font-black text-white mb-1">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                  <div className="text-[11px] text-[#666] mb-4">10x de R$ {(p.price/10).toFixed(2).replace('.', ',')} s/ juros</div>
                  <button className="w-full bg-[#FFD700] text-[#111] font-black py-2.5 text-xs tracking-wider uppercase hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" /> COMPRAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="py-6 bg-[#111] border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-[#FFD700] p-10 flex items-center justify-between">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=600&q=50')", backgroundSize: 'cover'}} />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_11px)]" />
            <div className="relative z-10">
              <div className="text-xs font-black tracking-[0.4em] text-[#111]/60 uppercase mb-2">Promoção Limitada</div>
              <h2 className="text-5xl font-black text-[#111] leading-none mb-1">ATÉ 60% OFF</h2>
              <div className="text-lg font-bold text-[#111]/70">Linha de Ferramentas Elétricas</div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="font-mono font-black text-4xl text-[#111]">2d 14h 32m</div>
              <button className="bg-[#111] text-[#FFD700] font-black px-8 py-3 uppercase tracking-wider text-sm hover:bg-[#333] transition-colors">
                APROVEITAR →
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[repeating-linear-gradient(45deg,#FFD700,#FFD700_10px,#111111_10px,#111111_20px)]" />
    </div>
  );
}
