import { Link } from "wouter";
import { ShoppingCart, Star, StarHalf, Package, Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@workspace/api-client-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    await addToCart(product.id, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <Link href={`/produto/${product.id}`} className="group h-full flex">
      <div className="bg-white w-full rounded-2xl border border-border p-3 flex flex-col hover:border-secondary hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discountPercent && product.discountPercent > 0 ? (
            <Badge variant="secondary" className="bg-secondary text-white border-none font-extrabold text-xs px-2 py-1 shadow-md -rotate-3">
              -{product.discountPercent}% OFF
            </Badge>
          ): null}
          {product.isNew && (
            <Badge className="bg-primary text-white border-none font-bold text-xs px-2 py-1 shadow-md">
              Novo
            </Badge>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="outline" className={`border-none shadow-sm text-[10px] font-bold px-2 py-0.5 ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.inStock ? 'Em estoque' : 'Esgotado'}
          </Badge>
        </div>

        {/* Image */}
        <div className="aspect-square mb-3 bg-white rounded-xl p-2 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-muted/30 rounded flex items-center justify-center text-muted-foreground">
              Sem Imagem
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 px-1">
          <div className="text-xs text-muted-foreground mb-1.5 uppercase font-bold tracking-wider flex justify-between items-center">
            <span className="truncate mr-2">{product.brand || 'Valfre'}</span>
            <span className="flex items-center text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <StarHalf className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 text-[10px] text-muted-foreground font-medium">({Math.floor(Math.random() * 150) + 10})</span>
            </span>
          </div>
          
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-3 group-hover:text-secondary transition-colors flex-1 leading-snug">
            {product.name}
          </h3>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] text-muted-foreground line-through mb-0.5">
                  de {formatCurrency(product.originalPrice)} por
                </span>
              )}
              <span className="text-2xl font-display font-extrabold text-primary leading-none tracking-tight">
                {formatCurrency(product.price)}
              </span>
              <div className="bg-muted/50 rounded flex items-center justify-center py-1 mt-1.5 border border-muted">
                <span className="text-[11px] text-muted-foreground font-medium">
                  ou 10x de <strong className="text-foreground">{formatCurrency(product.price / 10)}</strong> s/ juros
                </span>
              </div>
            </div>

            <Button 
              onClick={handleAdd}
              className={`w-full hover:shadow-md transition-all gap-2 font-bold h-10 ${product.inStock ? 'bg-secondary hover:bg-secondary/90 text-white' : 'bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted'}`}
              disabled={!product.inStock}
            >
              {product.inStock ? (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao Carrinho
                </>
              ) : (
                <>
                  <Package className="w-4 h-4" />
                  Avise-me quando chegar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
