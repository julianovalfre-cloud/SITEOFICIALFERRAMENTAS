import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Phone, Hammer, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/categoria/busca?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-primary/95 text-primary-foreground text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium"><Phone className="w-3 h-3" /> (11) 9999-9999</span>
          <span className="opacity-70">|</span>
          <span>Atendimento: Seg-Sex 8h as 18h</span>
        </div>
        <div className="font-semibold text-secondary animate-pulse">
          FRETE GRÁTIS ACIMA DE R$ 199* | PARCELE EM ATÉ 12X
        </div>
        <div className="flex gap-4">
          <Link href="/rastreio" className="hover:text-secondary transition-colors">Rastreie seu pedido</Link>
          <Link href="/sobre" className="hover:text-secondary transition-colors">Nossas Lojas</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ferramentas Valfre" className="h-10 md:h-12 object-contain" />
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
            <Input 
              type="search" 
              placeholder="O que você está procurando?" 
              className="w-full bg-white text-foreground rounded-r-none border-0 h-11 focus-visible:ring-2 focus-visible:ring-secondary pl-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none h-11 bg-secondary hover:bg-secondary/90 border-0 px-6">
              <Search className="w-5 h-5 text-white" />
            </Button>
          </form>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <Link href="/login" className="hidden lg:flex items-center gap-3 hover:text-secondary transition-colors">
              <User className="w-6 h-6" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs opacity-80">Bem-vindo(a)</span>
                <span className="text-sm font-bold">Entre ou Cadastre-se</span>
              </div>
            </Link>

            <Link href="/carrinho" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-2 md:px-4 md:py-2.5 rounded-lg transition-all border border-white/10 hover:border-secondary group relative">
              <ShoppingCart className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-xs opacity-80">Meu Carrinho</span>
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary shadow-lg animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search - Rendered below on small screens */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="flex w-full relative">
            <Input 
              type="search" 
              placeholder="Buscar ferramentas..." 
              className="w-full bg-white text-foreground rounded-r-none border-0 h-10 pl-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none h-10 bg-secondary px-4">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </form>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-border hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-8 flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="rounded-none h-12 px-6 font-bold flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 shadow-none border-0">
                <Menu className="w-5 h-5" />
                DEPARTAMENTOS
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-2 rounded-xl mt-1">
              <DropdownMenuItem asChild><Link href="/categoria/ferramentas-manuais" className="w-full cursor-pointer py-3 font-medium">Ferramentas Manuais</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/categoria/ferramentas-eletricas" className="w-full cursor-pointer py-3 font-medium">Ferramentas Elétricas</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/categoria/acessorios" className="w-full cursor-pointer py-3 font-medium">Acessórios e Peças</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/categoria/construcao" className="w-full cursor-pointer py-3 font-medium">Construção e Obra</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/categoria/eletrica" className="w-full cursor-pointer py-3 font-medium">Elétrica</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex items-center px-4">
            <ul className="flex items-center gap-8 text-sm font-semibold text-foreground/80">
              <li><Link href="/categoria/marcas" className="hover:text-secondary transition-colors py-3 block border-b-2 border-transparent hover:border-secondary">Principais Marcas</Link></li>
              <li><Link href="/categoria/lancamentos" className="hover:text-secondary transition-colors py-3 block border-b-2 border-transparent hover:border-secondary">Lançamentos</Link></li>
              <li><Link href="/categoria/outlet" className="text-secondary hover:text-secondary/80 transition-colors py-3 block border-b-2 border-transparent hover:border-secondary flex items-center gap-1"><Hammer className="w-4 h-4"/> Outlet Valfre</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
