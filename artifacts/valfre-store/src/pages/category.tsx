import { useRoute, useLocation, Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { useListProducts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, SlidersHorizontal, ChevronRight, ChevronLeft, LayoutGrid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const BRANDS = ["Bosch", "Makita", "DeWalt", "Vonder", "Tramontina", "Stanley", "Gedore", "Black+Decker"];
const PAGE_SIZE = 12;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "ferramentas-manuais": "Martelos, alicates, chaves, serras e muito mais. Ferramentas manuais profissionais para qualquer trabalho.",
  "ferramentas-eletricas": "Furadeiras, parafusadeiras, esmerilhadeiras e serras das melhores marcas do mercado.",
  "construcao": "Tudo para construção e obra: ferramentas de pedreiro, pintura, argamassa e soldagem.",
  "acessorios": "Lâminas, discos de corte, brocas, mandris e peças de reposição.",
  "eletrica": "Iluminação, lâmpadas, disjuntores e materiais elétricos.",
  "automotivo": "Lubrificantes, aditivos e ferramentas para manutenção automotiva.",
  "climatizacao": "Ventiladores, climatizadores, aquecedores e refrigeração.",
  "casa": "Organizadores, suportes e utilidades para casa.",
  "ofertas": "Os melhores produtos com os maiores descontos. Aproveite enquanto durar!",
};

export default function Category() {
  const [, params] = useRoute("/categoria/:slug");
  const [, params2] = useRoute("/categoria/:slug/:sub");
  const [location] = useLocation();
  const slug = params?.slug || params2?.slug || "todas";
  const sub = params2?.sub;

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const searchParam = new URLSearchParams(location.split("?")[1] || "").get("search") || undefined;

  const { data, isLoading } = useListProducts({
    category: slug !== "todas" && slug !== "busca" ? slug : undefined,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    search: searchParam,
  });

  const products = data?.products || [];
  const total = data?.total || products.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const rawTitle = sub
    ? sub.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    : slug === "busca"
    ? `Resultados para "${searchParam || ""}"`
    : slug === "todas"
    ? "Todos os Produtos"
    : slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const description = CATEGORY_DESCRIPTIONS[slug] || "Encontre os melhores produtos com os melhores preços.";

  const toggleBrand = (brand: string) => {
    setSelectedBrands(bs => bs.includes(brand) ? bs.filter(b => b !== brand) : [...bs, brand]);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setOnlyInStock(false);
    setPage(1);
  };

  const hasActiveFilters = selectedBrands.length > 0 || minPrice || maxPrice || onlyInStock;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtros ativos</span>
          <button onClick={clearFilters} className="text-xs text-secondary font-bold flex items-center gap-1 hover:underline">
            <X className="w-3 h-3" /> Limpar
          </button>
        </div>
      )}

      {/* Price range */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-slate-800 flex items-center gap-2">
          💰 Faixa de Preço
        </h3>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-[10px] text-slate-400 font-medium block mb-1">Mínimo</label>
            <input
              type="number"
              placeholder="R$ 0"
              value={minPrice}
              onChange={e => { setMinPrice(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-sm text-slate-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30"
            />
          </div>
          <div className="text-slate-300 mt-5">—</div>
          <div className="flex-1">
            <label className="text-[10px] text-slate-400 font-medium block mb-1">Máximo</label>
            <input
              type="number"
              placeholder="R$ 9999"
              value={maxPrice}
              onChange={e => { setMaxPrice(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-sm text-slate-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30"
            />
          </div>
        </div>
        {/* Quick ranges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {[["Até R$100", "", "100"], ["R$100–500", "100", "500"], ["R$500+", "500", ""]].map(([label, min, max]) => (
            <button
              key={label}
              onClick={() => { setMinPrice(min); setMaxPrice(max); setPage(1); }}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${minPrice === min && maxPrice === max ? 'bg-secondary text-white border-secondary' : 'border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-slate-800 flex items-center gap-2">🏷️ Marcas</h3>
        <div className="space-y-2.5">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              <span className={`text-sm font-medium transition-colors ${selectedBrands.includes(brand) ? 'text-secondary' : 'text-slate-700 group-hover:text-secondary'}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-slate-800 flex items-center gap-2">📦 Disponibilidade</h3>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <Checkbox
            checked={onlyInStock}
            onCheckedChange={(v) => { setOnlyInStock(!!v); setPage(1); }}
            className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-secondary">Em estoque apenas</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Category hero */}
      <div className="bg-primary text-white border-b-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100 hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {sub ? (
              <>
                <Link href={`/categoria/${slug}`} className="hover:opacity-100 hover:text-secondary transition-colors capitalize">{slug.replace(/-/g, " ")}</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="opacity-100 font-bold text-white capitalize">{sub.replace(/-/g, " ")}</span>
              </>
            ) : (
              <span className="opacity-100 font-bold text-white">{rawTitle}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight capitalize">{rawTitle}</h1>
          {description && !sub && (
            <p className="text-white/70 text-sm mt-2 max-w-xl">{description}</p>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full flex flex-col md:flex-row gap-6">

        {/* Mobile filter toggle */}
        <div className="md:hidden">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 font-bold"
            onClick={() => setShowMobileFilter(true)}
          >
            <Filter className="w-4 h-4 text-secondary" />
            Filtros {hasActiveFilters && <span className="bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedBrands.length + (onlyInStock ? 1 : 0)}</span>}
          </Button>
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 bg-black/40 flex">
              <div className="ml-auto w-80 bg-white h-full overflow-y-auto p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black text-lg text-primary">Filtros</h2>
                  <button onClick={() => setShowMobileFilter(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>
                <FilterSidebar />
                <Button className="w-full mt-6 bg-secondary text-white font-bold" onClick={() => setShowMobileFilter(false)}>
                  Ver Resultados
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-28 shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-base text-primary">
                <Filter className="w-4 h-4 text-secondary" /> Filtros
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-secondary font-bold hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Limpar tudo
                </button>
              )}
            </div>
            <FilterSidebar />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 shadow-sm">
            <div className="text-sm text-slate-500 font-medium">
              {isLoading ? "Buscando produtos..." : (
                <><strong className="text-slate-800">{total}</strong> produto{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}</>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
                <button className="p-2 hover:bg-slate-50 text-secondary transition-colors"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-slate-50 text-slate-400 transition-colors border-l border-slate-200"><List className="w-4 h-4" /></button>
              </div>
              <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setPage(1); }}>
                <SelectTrigger className="w-[170px] border-slate-200 text-sm h-9">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Mais Relevantes</SelectItem>
                  <SelectItem value="price_asc">Menor Preço</SelectItem>
                  <SelectItem value="price_desc">Maior Preço</SelectItem>
                  <SelectItem value="newest">Mais Recentes</SelectItem>
                  <SelectItem value="discount">Maior Desconto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-col">
                  <Skeleton className="w-full aspect-square rounded-xl mb-3" />
                  <Skeleton className="w-1/3 h-3 mb-2" />
                  <Skeleton className="w-full h-4 mb-1" />
                  <Skeleton className="w-3/4 h-4 mb-4" />
                  <Skeleton className="w-1/2 h-6 mb-1" />
                  <Skeleton className="w-full h-9 mt-auto" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="h-9 w-9 p-0 border-slate-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={`h-9 w-9 p-0 font-bold text-sm ${page === pageNum ? 'bg-secondary border-secondary text-white hover:bg-secondary/90' : 'border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary'}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="h-9 w-9 p-0 border-slate-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-200">
                <Filter className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Nenhum produto encontrado</h3>
              <p className="text-slate-400 text-sm mb-6">Tente alterar os filtros ou buscar outro termo.</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="border-secondary text-secondary font-bold">
                  Limpar Filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
