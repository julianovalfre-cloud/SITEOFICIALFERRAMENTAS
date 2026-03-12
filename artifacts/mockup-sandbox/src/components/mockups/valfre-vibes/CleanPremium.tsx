import { ShoppingCart, Search, Heart, User, ChevronRight, ArrowRight, Star, Truck, Shield, CreditCard, Package } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto 3/8\" 650W Bosch", brand: "Bosch", price: 289.90, oldPrice: 349.90, discount: 17, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80", rating: 4.8, reviews: 312 },
  { id: 2, name: "Esmerilhadeira Angular 4.1/2\" 850W DeWalt", brand: "DeWalt", price: 379.90, oldPrice: 459.90, discount: 17, img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=80", rating: 4.9, reviews: 198 },
  { id: 3, name: "Parafusadeira a Bateria 12V Makita", brand: "Makita", price: 499.90, oldPrice: 599.90, discount: 16, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80", rating: 5.0, reviews: 421 },
  { id: 4, name: "Jogo de Chaves Combinadas 8-24mm", brand: "Gedore", price: 156.90, oldPrice: 189.90, discount: 17, img: "https://images.unsplash.com/photo-1610414717393-a5d9a7fabb78?w=300&q=80", rating: 4.7, reviews: 86 },
];

const CATS = [
  { name: "Ferramentas Elétricas", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80" },
  { name: "Ferramentas Manuais", img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=80" },
  { name: "Construção & Obra", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=80" },
  { name: "Automotivo", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&q=80" },
];

export function CleanPremium() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] font-['Inter',sans-serif] overflow-x-hidden">

      {/* Ultra-thin top bar */}
      <div className="bg-[#1a2d4f] text-white/70 text-xs py-2 flex items-center justify-center gap-8">
        <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-white/50" /> Frete grátis acima de R$ 199</span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-white/50" /> Parcele em até 12x sem juros</span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-white/50" /> Compra 100% segura</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-8">
          <div className="shrink-0">
            <div className="text-[10px] font-semibold text-gray-400 tracking-[0.3em] uppercase mb-0.5">Ferramentas</div>
            <div className="text-2xl font-black text-[#1a2d4f] tracking-tight">VALFRE</div>
          </div>

          <div className="flex-1 relative mx-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input className="w-full border border-gray-200 rounded-full py-2.5 pl-11 pr-5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2d4f] transition-colors bg-gray-50 focus:bg-white" placeholder="O que você procura?" />
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a2d4f] transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Entrar</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a2d4f] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2.5 bg-[#1a2d4f] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1a2d4f]/90 transition-colors relative">
              <ShoppingCart className="w-4 h-4" />
              <span>Carrinho</span>
              <span className="absolute -top-1.5 -right-1 bg-[#E8651A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-8 flex items-center gap-1">
            <button className="flex items-center gap-2 text-sm font-semibold text-[#1a2d4f] px-4 py-3 hover:text-[#E8651A] transition-colors">
              Todos Departamentos <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            {["Ofertas do Dia", "Principais Marcas", "Lançamentos", "Kits e Combos"].map(n => (
              <a key={n} href="#" className="text-sm text-gray-500 hover:text-[#1a2d4f] px-4 py-3 transition-colors font-medium">{n}</a>
            ))}
          </div>
        </div>
      </header>

      {/* Hero – split light layout */}
      <section className="bg-[#f8f9fc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E8651A] bg-[#E8651A]/8 px-3 py-1.5 rounded-full mb-5">
              ✦ Coleção Profissional 2026
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-[#1a2d4f] leading-[1.05] tracking-tight mb-5">
              Ferramentas<br />
              de precisão<br />
              <span className="text-[#E8651A]">para resultados</span><br />
              perfeitos.
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Mais de 15.000 produtos profissionais das melhores marcas do mundo. Entrega expressa para todo o Brasil.
            </p>
            <div className="flex gap-3">
              <button className="bg-[#1a2d4f] text-white font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-[#1a2d4f]/90 transition-colors flex items-center gap-2">
                Explorar catálogo <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-gray-200 text-[#1a2d4f] font-semibold px-8 py-3.5 rounded-full text-sm hover:border-[#1a2d4f]/40 transition-colors bg-white">
                Ver ofertas
              </button>
            </div>
            <div className="flex gap-10 mt-10 pt-8 border-t border-gray-200">
              {[["15K+", "Produtos"], ["4.9", "Avaliação média"], ["24h", "Entrega express"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-[#1a2d4f]">{n}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(26,45,79,0.12)] border border-gray-100">
              <img src="https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=700&q=80" alt="Ferramentas" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Entrega garantida</div>
                <div className="text-sm font-bold text-[#1a2d4f]">Todo o Brasil</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="text-xs text-gray-400 font-medium mb-1">Avaliação geral</div>
              <div className="flex items-center gap-1">
                {Array.from({length: 5}).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                <span className="text-sm font-black text-[#1a2d4f] ml-1">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-4 gap-4 divide-x divide-gray-100">
          {[[Truck, "Entrega Expressa", "Para todo o Brasil"], [CreditCard, "12x sem juros", "No cartão de crédito"], [Shield, "Compra Segura", "100% protegida"], [Package, "Troca Fácil", "7 dias garantidos"]].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-center gap-3 pl-4 first:pl-0">
              <Icon className="w-5 h-5 text-[#E8651A] shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#1a2d4f]">{t as string}</div>
                <div className="text-xs text-gray-400">{s as string}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-2xl font-black text-[#1a2d4f]">Categorias</h2>
              <p className="text-sm text-gray-400 mt-1">Encontre exatamente o que precisa</p>
            </div>
            <a href="#" className="text-sm font-semibold text-[#E8651A] hover:underline flex items-center gap-1">
              Ver todas <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CATS.map(c => (
              <div key={c.name} className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1a2d4f]/20 hover:shadow-[0_8px_30px_rgba(26,45,79,0.08)] transition-all cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d4f]/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                  <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#E8651A] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-[#f8f9fc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-2xl font-black text-[#1a2d4f]">Mais Vendidos</h2>
              <p className="text-sm text-gray-400 mt-1">Os favoritos dos profissionais</p>
            </div>
            <a href="#" className="text-sm font-semibold text-[#1a2d4f] hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(26,45,79,0.07)] transition-all overflow-hidden cursor-pointer">
                <div className="relative">
                  {p.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-[#E8651A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                      -{p.discount}%
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center z-10 hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <div className="aspect-square bg-gray-50 p-6 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-400" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-bold text-[#E8651A] tracking-widest uppercase mb-1.5">{p.brand}</div>
                  <h3 className="text-sm font-semibold text-[#1a2d4f] line-clamp-2 mb-2 leading-snug">{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-1">({p.reviews})</span>
                  </div>
                  {p.oldPrice && <div className="text-xs text-gray-400 line-through mb-0.5">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</div>}
                  <div className="text-xl font-black text-[#1a2d4f] mb-0.5">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                  <div className="text-[11px] text-gray-400 mb-4">ou 10x de R$ {(p.price/10).toFixed(2).replace('.', ',')} s/ juros</div>
                  <button className="w-full bg-[#1a2d4f] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#1a2d4f]/90 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo – clean version */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-[#1a2d4f] rounded-3xl overflow-hidden relative flex items-center justify-between p-12">
            <div className="absolute right-0 inset-y-0 w-2/5 overflow-hidden opacity-20">
              <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=60" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2d4f] via-[#1a2d4f] to-transparent" />
            <div className="relative z-10 max-w-lg">
              <div className="text-xs font-semibold text-white/50 tracking-[0.3em] uppercase mb-3">Promoção especial</div>
              <h2 className="text-5xl font-black text-white leading-none mb-2">Até 60% OFF</h2>
              <p className="text-[#E8651A] font-semibold text-lg mb-6">Em ferramentas elétricas selecionadas</p>
              <p className="text-white/60 text-sm mb-7 leading-relaxed">Aproveite as melhores marcas com preços nunca vistos. Oferta por tempo limitado.</p>
              <div className="flex items-center gap-4">
                <button className="bg-[#E8651A] text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-[#E8651A]/90 transition-colors flex items-center gap-2">
                  Ver Ofertas <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-white/60 text-sm font-mono">2d 14h 32m restantes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
