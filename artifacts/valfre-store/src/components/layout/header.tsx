import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Phone, Heart, ChevronDown, Wrench, Zap, PaintRoller, Hammer, HardHat, Cog } from "lucide-react";
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
    <header className="w-full flex flex-col z-50 sticky top-0 shadow-lg">
      {/* Top Announcement Bar - Handled inside home page now, but keeping a tiny header info bar */}
      <div className="bg-primary-foreground text-primary text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex border-b border-border font-medium">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-bold text-secondary"><Phone className="w-3.5 h-3.5" /> (11) 9999-9999</span>
            <span className="opacity-30">|</span>
            <span className="text-muted-foreground">Atendimento: Seg-Sex 8h as 18h</span>
          </div>
          <div className="flex gap-4 text-muted-foreground">
            <Link href="/rastreio" className="hover:text-secondary transition-colors">Rastreie seu pedido</Link>
            <span className="opacity-30">|</span>
            <Link href="/lojas" className="hover:text-secondary transition-colors">Nossas Lojas</Link>
            <span className="opacity-30">|</span>
            <Link href="/ajuda" className="hover:text-secondary transition-colors">Central de Ajuda</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary text-primary-foreground py-5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ferramentas Valfre" className="h-10 md:h-12 object-contain" />
            </Link>
          </div>

          {/* Search Bar - Animated Placeholder via CSS or simple input */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input 
              type="search" 
              placeholder="Digite o que você procura (ex: Furadeira, Bosch, Alicate...)" 
              className="w-full bg-white text-foreground rounded-full border-0 h-12 focus-visible:ring-2 focus-visible:ring-secondary pl-12 pr-24 shadow-inner text-base transition-all group-hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1 top-1 bottom-1 rounded-full bg-secondary hover:bg-secondary/90 border-0 px-6 font-bold shadow-sm">
              Buscar
            </Button>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <Link href="/login" className="hidden lg:flex items-center gap-3 hover:text-secondary transition-colors group cursor-pointer">
              <div className="bg-white/10 p-2.5 rounded-full group-hover:bg-secondary/20 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-primary-foreground/70 font-medium">Bem-vindo(a)</span>
                <span className="text-sm font-bold">Entrar / Cadastrar</span>
              </div>
            </Link>

            <Link href="/favoritos" className="hidden md:flex items-center justify-center bg-white/10 hover:bg-secondary/20 p-2.5 rounded-full transition-colors relative cursor-pointer group">
              <Heart className="w-5 h-5 group-hover:text-secondary transition-colors" />
            </Link>

            <Link href="/carrinho" className="flex items-center gap-3 bg-secondary hover:bg-secondary/90 p-2 md:px-5 md:py-2.5 rounded-full transition-all border border-secondary shadow-lg group cursor-pointer">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-white text-secondary text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col leading-tight text-white">
                <span className="text-sm font-bold">Meu Carrinho</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="flex w-full relative">
            <Input 
              type="search" 
              placeholder="Buscar ferramentas..." 
              className="w-full bg-white text-foreground rounded-l-lg rounded-r-none border-0 h-11 pl-4 shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none rounded-r-lg h-11 bg-secondary hover:bg-secondary/90 px-5 font-bold shadow-md">
              <Search className="w-5 h-5 text-white" />
            </Button>
          </form>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-border hidden md:block shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto flex items-center h-14">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-none h-full px-6 font-bold flex items-center gap-3 bg-secondary text-white hover:bg-secondary hover:text-white hover:brightness-110 shadow-none border-0 cursor-pointer">
                <Menu className="w-5 h-5" />
                TODOS OS DEPARTAMENTOS
                <ChevronDown className="w-4 h-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[600px] p-4 rounded-xl mt-0 border-t-0 rounded-t-none shadow-xl grid grid-cols-2 gap-x-8 gap-y-2">
              <DropdownMenuItem asChild>
                <Link href="/categoria/ferramentas-manuais" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><Wrench className="w-5 h-5 text-primary" /></div>
                  Ferramentas Manuais
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/ferramentas-eletricas" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><Zap className="w-5 h-5 text-primary" /></div>
                  Ferramentas Elétricas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/baterias" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><Zap className="w-5 h-5 text-primary" /></div>
                  Baterias e Carregadores
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/acessorios" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><Cog className="w-5 h-5 text-primary" /></div>
                  Acessórios e Peças
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/construcao" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><Hammer className="w-5 h-5 text-primary" /></div>
                  Construção Civil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/epi" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><HardHat className="w-5 h-5 text-primary" /></div>
                  Equipamentos EPI
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categoria/pintura" className="flex items-center gap-3 cursor-pointer py-3 px-3 hover:bg-muted rounded-lg font-medium text-foreground">
                  <div className="bg-primary/5 p-2 rounded-md"><PaintRoller className="w-5 h-5 text-primary" /></div>
                  Pintura e Acabamento
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="col-span-2 mt-2">
                <Link href="/categoria/todas" className="flex items-center justify-center gap-2 cursor-pointer py-3 px-3 bg-muted/50 hover:bg-muted text-primary rounded-lg font-bold">
                  Ver Todas as Categorias <ArrowRight className="w-4 h-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex-1 px-8">
            <ul className="flex items-center gap-8 text-[13px] font-bold text-foreground uppercase tracking-wide">
              <li><Link href="/categoria/ofertas" className="text-secondary hover:text-secondary/80 transition-colors py-4 block flex items-center gap-2"><Zap className="w-4 h-4 fill-current"/> Ofertas do Dia</Link></li>
              <li><Link href="/categoria/marcas" className="hover:text-primary transition-colors py-4 block border-b-2 border-transparent hover:border-primary">Principais Marcas</Link></li>
              <li><Link href="/categoria/lancamentos" className="hover:text-primary transition-colors py-4 block border-b-2 border-transparent hover:border-primary">Lançamentos</Link></li>
              <li><Link href="/categoria/kits" className="hover:text-primary transition-colors py-4 block border-b-2 border-transparent hover:border-primary">Kits e Combos</Link></li>
              <li><Link href="/categoria/outlet" className="hover:text-primary transition-colors py-4 block border-b-2 border-transparent hover:border-primary">Outlet</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function ArrowRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}
