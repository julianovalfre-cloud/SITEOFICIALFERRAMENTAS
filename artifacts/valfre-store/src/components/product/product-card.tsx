import { useLocation } from "wouter";
import { ShoppingCart, Heart, Star, Package, Zap, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@workspace/api-client-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { useState } from "react";

const PIX_DISCOUNT = 0.05;

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [, navigate] = useLocation();
  const [favorited, setFavorited] = useState(false);
  const [adding, setAdding] = useState(false);

  const pixPrice = product.price * (1 - PIX_DISCOUNT);
  const installment = product.price / 12;
  const href = `/produto/${product.id}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      navigate(href);
    }
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    await addToCart(product.id, 1);
    toast.success(`${product.name} adicionado!`);
    setAdding(false);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited(f => !f);
    toast.success(favorited ? "Removido dos favoritos" : "Salvo nos favoritos!");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(href);
  };

  return (
    <div onClick={handleCardClick} className="group h-full flex cursor-pointer">
      <div className="bg-white w-full rounded-2xl border border-slate-200 flex flex-col hover:border-secondary hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {product.discountPercent && product.discountPercent > 0 ? (
            <Badge className="bg-secondary text-white border-none font-black text-xs px-2 py-0.5 shadow-md">
              -{product.discountPercent}% OFF
            </Badge>
          ) : null}
          {product.isNew && (
            <Badge className="bg-primary text-white border-none font-bold text-xs px-2 py-0.5">
              🆕 Novo
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amber-500 text-white border-none font-bold text-xs px-2 py-0.5">
              🔥 Mais Vendido
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:border-red-200 transition-all"
        >
          <Heart className={`w-4 h-4 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>

        {/* Image */}
        <div className="aspect-square bg-white p-3 flex items-center justify-center overflow-hidden relative">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
              <Package className="w-10 h-10" />
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">Esgotado</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mx-3" />

        {/* Info */}
        <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-2">

          {/* Brand + Rating */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-black text-secondary uppercase tracking-wider truncate">{product.brand || 'Valfre'}</span>
            <div className="flex items-center gap-0.5 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
              ))}
              <span className="text-[10px] text-slate-400 ml-0.5">({Math.floor(Math.random() * 150 + 15)})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-secondary transition-colors flex-1">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex flex-col gap-0.5 mt-auto">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through leading-none">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-black text-primary leading-none tracking-tight">
              {formatCurrency(product.price)}
            </span>

            {/* PIX price */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2 py-1 mt-0.5">
              <Zap className="w-3 h-3 text-green-600 fill-green-600 shrink-0" />
              <span className="text-[11px] text-green-700 font-bold">
                {formatCurrency(pixPrice)} <span className="font-normal">no Pix</span>
              </span>
            </div>

            {/* Installments */}
            <span className="text-[11px] text-slate-500 mt-0.5">
              12x de <strong className="text-slate-700">{formatCurrency(installment)}</strong>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-1.5 mt-1">
            <Button
              onClick={handleAdd}
              disabled={!product.inStock || adding}
              className="w-full h-9 text-xs font-bold gap-1.5 bg-secondary hover:bg-secondary/90 text-white shadow-sm shadow-secondary/20 disabled:bg-slate-200 disabled:text-slate-400"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {adding ? "Adicionando..." : product.inStock ? "Adicionar ao Carrinho" : "Avise-me"}
            </Button>
            {product.inStock && (
              <Button
                variant="outline"
                onClick={handleBuyNow}
                className="w-full h-8 text-xs font-bold border-primary text-primary hover:bg-primary hover:text-white gap-1 transition-all"
              >
                Comprar Agora <ArrowRight className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
