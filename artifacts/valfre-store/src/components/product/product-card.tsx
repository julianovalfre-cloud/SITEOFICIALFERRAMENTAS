import { Link } from "wouter";
import { ShoppingCart, Star } from "lucide-react";
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
      <div className="bg-card w-full rounded-2xl border border-border p-4 flex flex-col hover:border-secondary hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.discountPercent && product.discountPercent > 0 && (
            <Badge variant="secondary" className="bg-secondary text-white border-none font-bold shadow-md">
              -{product.discountPercent}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-primary text-white border-none shadow-md">Novo</Badge>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square mb-4 bg-white rounded-xl p-4 flex items-center justify-center mix-blend-multiply relative group-hover:scale-105 transition-transform duration-500">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-sm" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-muted/30 rounded flex items-center justify-center text-muted-foreground">
              Sem Imagem
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1">
          <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider flex justify-between">
            <span>{product.brand || 'Valfre'}</span>
            <span className="flex items-center text-amber-500"><Star className="w-3 h-3 fill-current mr-1" /> {product.rating || '5.0'}</span>
          </div>
          
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-4 group-hover:text-secondary transition-colors flex-1">
            {product.name}
          </h3>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span className="text-xl font-display font-bold text-primary leading-none">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                à vista ou 10x de {formatCurrency(product.price / 10)}
              </span>
            </div>

            <Button 
              onClick={handleAdd}
              className="w-full bg-primary hover:bg-secondary hover:text-white transition-colors gap-2 font-bold"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.inStock ? 'Comprar' : 'Esgotado'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
