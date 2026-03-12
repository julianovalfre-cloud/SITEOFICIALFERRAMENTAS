import { ShoppingCart, Search, Menu, Zap, Star, ArrowRight, Flame, BadgePercent, Truck, Shield, CreditCard, ChevronRight, Phone } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto 3/8\" 650W", brand: "BOSCH", price: 289.90, oldPrice: 349.90, discount: 17, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=70", rating: 4.8, reviews: 312, hot: true },
  { id: 2, name: "Esmerilhadeira Angular 4.1/2\" 850W", brand: "DEWALT", price: 379.90, oldPrice: 459.90, discount: 17, img: "https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=300&q=70", rating: 4.9, reviews: 198, hot: false },
  { id: 3, name: "Parafusadeira a Bateria 12V", brand: "MAKITA", price: 499.90, oldPrice: 599.90, discount: 16, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=70", rating: 5.0, reviews: 421, hot: true },
  { id: 4, name: "Jogo de Chaves 8-24mm 8 Peças", brand: "GEDORE", price: 156.90, oldPrice: 189.90, discount: 17, img: "https://images.unsplash.com/photo-1610414717393-a5d9a7fabb78?w=300&q=70", rating: 4.7, reviews: 86, hot: false },
  { id: 5, name: "Martelo de Pena 27mm Tramontina", brand: "TRAMONTINA", price: 47.90, oldPrice: 59.90, discount: 20, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=70", rating: 4.6, reviews: 201, hot: false },
];

export function EnergeticoBrasilian() {
  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif] overflow-x-hidden">

      {/* Flash strip */}
      <div className="bg-[#c41e0e] text-white text-center py-2 text-sm font-bold tracking-wide flex items-center justify-center gap-4">
        <Zap className="w-4 h-4 fill-white" />
        FEIRÃO VALFRE: DESCONTO DE ATÉ 60% EM MAIS DE 500 PRODUTOS!
        <Zap className="w-4 h-4 fill-white" />
      </div>

      {/* Top bar */}
      <div className="bg-[#ff6900] text-white text-xs py-1.5 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> (11) 9999-9999</span>
          <span>Seg-Sex: 8h às 18h</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Rastreie seu pedido</a>
          <a href="#" className="hover:underline">Nossas Lojas</a>
          <a href="#" className="hover:underline">Central de Ajuda</a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="shrink-0 flex items-center gap-2">
            <div className="bg-[#ff6900] rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Ferramentas</div>
              <div className="text-xl font-black text-[#1a2d4f] leading-none tracking-tight">VALFRE</div>
            </div>
          </div>

          <div className="flex-1 flex bg-gray-100 rounded-lg overflow-hidden border-2 border-[#ff6900] mx-2">
            <input className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 outline-none" placeholder="Ex: Furadeira Bosch, Alicate, Solda..." />
            <button className="bg-[#ff6900] px-6 flex items-center justify-center hover:bg-orange-700 transition-colors text-white font-bold text-sm gap-1.5">
              <Search className="w-4 h-4" /> BUSCAR
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex flex-col items-center text-gray-600 hover:text-[#ff6900] transition-colors text-xs">
              <span className="text-gray-400 text-[10px]">Bem-vindo!</span>
              <span className="font-bold">Entre / Cadastre</span>
            </button>
            <button className="relative bg-[#1a2d4f] hover:bg-[#ff6900] transition-colors text-white rounded-lg px-4 py-2.5 flex items-center gap-2 font-bold text-sm">
              <ShoppingCart className="w-5 h-5" />
              <span>Carrinho</span>
              <span className="absolute -top-2 -right-2 bg-[#ff6900] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">3</span>
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="bg-[#1a2d4f] border-t border-[#132240]">
          <div className="max-w-7xl mx-auto px-4 flex items-stretch">
            <button className="flex items-center gap-2 bg-[#ff6900] text-white font-black text-xs px-5 py-3 hover:bg-orange-600 transition-colors uppercase tracking-wider">
              <Menu className="w-4 h-4" /> TODOS DEPARTAMENTOS
            </button>
            <a href="#" className="flex items-center gap-1.5 px-4 py-3 text-xs font-black text-[#ff6900] uppercase tracking-wider hover:bg-[#ff6900] hover:text-white transition-colors border-l border-white/10">
              <Zap className="w-3.5 h-3.5 fill-current" /> OFERTAS DO DIA
            </a>
            {["PRINCIPAIS MARCAS", "LANÇAMENTOS", "KITS E COMBOS", "OUTLET"].map(n => (
              <a key={n} href="#" className="px-4 py-3 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10 uppercase tracking-wider">{n}</a>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#ff6900] via-[#ff8c00] to-[#ffa500] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=50')", backgroundSize: 'cover'}} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#c41e0e]/20 rounded-full translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-extrabold mb-5 uppercase tracking-wider">
              <BadgePercent className="w-4 h-4" /> Feirão de Inverno — Tempo Limitado!
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.0] mb-4 drop-shadow-lg" style={{textShadow: '0 2px 20px rgba(0,0,0,0.2)'}}>
              ATÉ<br />
              <span className="text-[#1a2d4f]">60% OFF</span>
            </h1>
            <h2 className="text-2xl font-bold mb-5 opacity-95">Nas melhores marcas do mercado!</h2>
            <p className="text-white/90 text-base mb-6 max-w-lg leading-relaxed">
              Bosch, DeWalt, Makita, Tramontina e muito mais. Parcele em até 12x sem juros e receba em todo o Brasil.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-[#1a2d4f] text-white font-extrabold px-8 py-4 rounded-xl text-base hover:bg-[#0d1f36] transition-colors shadow-lg flex items-center gap-2">
                VER OFERTAS <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#ff6900] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-gray-50 transition-colors shadow-lg">
                CATÁLOGO
              </button>
            </div>
            <div className="flex gap-6">
              {[["✓", "Frete Grátis > R$199"], ["✓", "12x sem juros"], ["✓", "Entrega em 24h*"]].map(([ico, t]) => (
                <span key={t} className="flex items-center gap-1.5 text-sm font-semibold text-white/90">
                  <span className="w-5 h-5 bg-[#1a2d4f] rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{ico}</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-md lg:max-w-none flex-1 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
              <img src="https://images.unsplash.com/photo-1587924025-bdc38eb22b95?w=700&q=80" alt="Ferramentas" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="absolute -top-3 -right-3 bg-[#c41e0e] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl font-black rotate-12 text-center leading-tight">
              <span className="text-xs">ATÉ</span>
              <span className="text-2xl">60%</span>
              <span className="text-xs">OFF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#1a2d4f] text-white">
        <div className="max-w-7xl mx-auto px-4 flex divide-x divide-white/10">
          {[[Truck, "Entrega Expressa", "Para todo o Brasil"], [CreditCard, "Parcele em 12x", "Sem juros no cartão"], [Shield, "Compra Garantida", "Proteção total"], [Zap, "Mais de 15.000", "Produtos em estoque"]].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3.5 first:pl-0">
              <Icon className="w-6 h-6 text-[#ff6900] shrink-0" />
              <div>
                <div className="text-sm font-bold">{t as string}</div>
                <div className="text-xs text-white/60">{s as string}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products with big price callouts */}
      <section className="py-8 bg-white border-t-4 border-[#ff6900]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#ff6900] text-white font-black text-sm px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-white" /> MAIS VENDIDOS
            </div>
            <div className="text-sm text-gray-500 font-medium">Os favoritos dos profissionais</div>
            <div className="ml-auto">
              <a href="#" className="text-[#ff6900] text-sm font-bold hover:underline flex items-center gap-1">
                VER TODOS <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {PRODUCTS.map(p => (
              <div key={p.id} className="group bg-white border-2 border-gray-100 hover:border-[#ff6900] transition-all rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md relative">
                {p.hot && (
                  <div className="absolute top-0 left-0 right-0 bg-[#c41e0e] text-white text-[10px] font-black text-center py-0.5 uppercase tracking-wider z-10">
                    🔥 SUPER OFERTA
                  </div>
                )}
                <div className="relative">
                  {p.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-[#ff6900] text-white text-[10px] font-black px-2 py-0.5 rounded z-10">
                      -{p.discount}%
                    </div>
                  )}
                  <div className={`aspect-square bg-gray-50 overflow-hidden ${p.hot ? 'mt-5' : ''} p-3`}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <div className="text-[9px] font-black text-[#ff6900] tracking-widest uppercase mb-1">{p.brand}</div>
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-2 mb-2 leading-snug">{p.name}</h3>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />)}
                    <span className="text-[9px] text-gray-400 ml-0.5">({p.reviews})</span>
                  </div>
                  {p.oldPrice && <div className="text-[10px] text-gray-400 line-through">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</div>}
                  <div className="text-xl font-black text-[#1a2d4f] leading-tight">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                  <div className="text-[10px] text-gray-500 mb-3">10x de R$ {(p.price/10).toFixed(2).replace('.', ',')}</div>
                  <button className="w-full bg-[#ff6900] hover:bg-orange-700 text-white font-black py-2 rounded text-xs transition-colors flex items-center justify-center gap-1 uppercase">
                    <ShoppingCart className="w-3.5 h-3.5" /> COMPRAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-side banners */}
      <section className="py-4 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-3">
          <div className="col-span-2 relative rounded-xl overflow-hidden h-44">
            <img src="https://images.unsplash.com/photo-1590739293931-a8f83d00bbf6?w=700&q=70" alt="" className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2d4f]/90 to-transparent p-6 flex flex-col justify-center">
              <div className="text-[#ff6900] font-black text-xs uppercase tracking-widest mb-1">DESTAQUE</div>
              <h3 className="text-white font-black text-2xl mb-2 leading-tight">Ferramentas Elétricas<br />com 40% OFF</h3>
              <button className="bg-[#ff6900] text-white font-black text-xs px-4 py-2 rounded w-fit uppercase tracking-wider hover:bg-orange-700 transition-colors flex items-center gap-1">
                VER OFERTA <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-44">
            <img src="https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=400&q=70" alt="" className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white font-black text-lg leading-tight mb-1">EPIs & Segurança</h3>
              <a href="#" className="text-[#ff6900] text-xs font-bold flex items-center gap-1 hover:underline">
                Ver tudo <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
