import { useRoute } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { useListProducts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Category() {
  const [, params] = useRoute("/categoria/:slug");
  const slug = params?.slug || "todas";

  const { data, isLoading } = useListProducts({ 
    category: slug !== "todas" && slug !== "busca" ? slug : undefined,
    limit: 20
  });

  const title = slug === "busca" ? "Resultados da Busca" : 
                slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-80 mb-4">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Categorias</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-bold text-white opacity-100">{title}</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">{title}</h1>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
            <div className="flex items-center gap-2 font-bold text-lg mb-6 border-b border-border pb-4">
              <Filter className="w-5 h-5 text-secondary" /> Filtros
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-3">Marcas</h3>
                <div className="space-y-3">
                  {['Bosch', 'Makita', 'DeWalt', 'Vonder', 'Tramontina'].map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={`brand-${brand}`} />
                      <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Disponibilidade</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" defaultChecked />
                  <label htmlFor="in-stock" className="text-sm font-medium leading-none">
                    Em estoque apenas
                  </label>
                </div>
              </div>

              <Button className="w-full bg-primary text-white mt-4">Aplicar Filtros</Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <span className="text-sm text-muted-foreground font-medium">
              Mostrando <strong className="text-foreground">{data?.products?.length || 0}</strong> produtos
            </span>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Mais Relevantes</SelectItem>
                  <SelectItem value="price_asc">Menor Preço</SelectItem>
                  <SelectItem value="price_desc">Maior Preço</SelectItem>
                  <SelectItem value="newest">Lançamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-4 flex flex-col h-[400px]">
                  <Skeleton className="w-full aspect-square rounded-xl mb-4" />
                  <Skeleton className="w-3/4 h-4 mb-2" />
                  <Skeleton className="w-1/2 h-8 mt-auto" />
                </div>
              ))}
            </div>
          ) : data?.products && data.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-border text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Filter className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground">Tente alterar os filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
