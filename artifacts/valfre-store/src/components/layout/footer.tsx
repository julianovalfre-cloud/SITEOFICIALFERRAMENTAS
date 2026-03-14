import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">

      {/* Newsletter */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <Mail className="w-10 h-10 shrink-0" />
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl">Receba Ofertas Exclusivas</h3>
              <p className="text-white/80 text-sm">Cadastre-se e ganhe 5% de desconto na primeira compra!</p>
            </div>
          </div>
          <form className="flex w-full md:max-w-md gap-2" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="Digite seu melhor e-mail" className="bg-white border-0 h-12 text-foreground focus-visible:ring-0" required />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white h-12 px-6 font-bold flex gap-2">
              Cadastrar <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ferramentas Valfre" className="h-12 object-contain object-left w-max mb-2 bg-white/10 p-2 rounded-lg" />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A Ferramentas Valfre é sua parceira ideal para obras, manutenções e projetos. Equipamentos profissionais com o melhor preço do mercado, servindo Cariacica, Viana, Vitória e Serra — ES.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider text-white">Atendimento</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <p className="font-bold text-white">(27) 99999-9999</p>
                  <p className="text-xs">Seg a Sex: 8h às 18h</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <p>contato@ferramentasvalfre.com.br</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p>Cariacica — ES<br />Grande Vitória</p>
              </li>
              <li className="pt-2">
                <a
                  href="https://melhorrastreio.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary/20 hover:bg-secondary text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  📦 Rastreie seu pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider text-white">Minha Conta</h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80 mb-7">
              <li><Link href="/login" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Entrar / Cadastrar</Link></li>
              <li><Link href="/minha-conta" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Meus Pedidos</Link></li>
              <li><Link href="/minha-conta" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Favoritos</Link></li>
              <li><Link href="/ajuda" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Central de Ajuda / FAQ</Link></li>
              <li><a href="https://melhorrastreio.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Rastrear Pedido</a></li>
            </ul>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider text-white">Institucional</h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link href="/politica-privacidade" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Política de Privacidade</Link></li>
              <li><Link href="/politica-devolucao" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Trocas e Devoluções</Link></li>
              <li><Link href="/garantia" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Garantia de Produtos</Link></li>
              <li><Link href="/politica-entrega" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Política de Entrega</Link></li>
              <li><Link href="/termos" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Pagamento */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider text-white">Pagamento Seguro</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {/* Visa */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 38 12" className="w-full fill-[#1434CB]"><path d="M14.07 11.231l2.253-7.05h3.639l-2.257 7.05h-3.635zm11.758-6.892c-1.018-.328-1.545-.558-1.545-1.026 0-.422.484-.863 1.548-.863 1.258 0 2.052.28 2.656.558l.421-2.457c-.636-.264-1.748-.528-3.093-.528-3.52 0-6.012 1.776-6.035 4.316-.02 1.867 1.748 2.915 3.084 3.541 1.365.64 1.821 1.054 1.821 1.624-.022.871-1.08 1.272-2.072 1.272-1.42 0-2.348-.22-3.083-.556L18.067 12c.74.34 2.046.626 3.424.64 3.738 0 6.168-1.752 6.196-4.475.02-1.503-1.022-2.656-3.859-3.826m10.158-4.137h-2.836c-.846 0-1.517.23-1.892 1.077L26.357 11.23h3.818l.764-2.062h4.646l.437 2.062h3.364l-3.558-11.029zm-3.02 6.643c.272-.72 1.314-3.518 1.314-3.518l.228-.636.388 1.156 1.127 2.998h-3.057zm-22.183-6.643l-3.55 7.643-1.428-6.425C5.642.532 4.453.228 3.033.202L.004.2v1.076c1.942.215 3.447.886 4.606 1.838l3.928 8.117h3.81l5.962-11.029H10.783z"/></svg>
              </div>
              {/* Mastercard */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 32 20" className="w-full"><circle fill="#EB001B" cx="10" cy="10" r="10"/><circle fill="#F79E1B" cx="22" cy="10" r="10"/><path fill="#FF5F00" d="M16 18c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg>
              </div>
              {/* PIX */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm font-black text-[#32bcad] text-sm">PIX</div>
              {/* Boleto */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <span className="text-[9px] font-black text-slate-700 text-center leading-tight">BOLETO<br/>BANCÁRIO</span>
              </div>
              {/* Elo */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm font-black text-[9px] text-[#FFD700] bg-[#1c1c1c] rounded overflow-hidden">
                <div className="bg-[#1c1c1c] w-full h-full flex items-center justify-center rounded font-black text-[#FFD700]">elo</div>
              </div>
              {/* Amex */}
              <div className="h-9 bg-[#006FCF] rounded flex items-center justify-center px-1 shadow-sm font-bold text-white text-[10px]">AMEX</div>
              {/* Hipercard */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <span className="text-[9px] font-black text-[#B5121B]">HIPER<br/>CARD</span>
              </div>
              {/* Débito */}
              <div className="h-9 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <span className="text-[9px] font-black text-slate-600 text-center">DÉBITO<br/>ONLINE</span>
              </div>
            </div>

            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">Segurança</h3>
            <div className="flex gap-2">
              <div className="bg-white rounded p-2 flex items-center gap-1.5 text-xs font-bold text-green-700 flex-1 shadow-sm">
                <Lock className="w-4 h-4 shrink-0" />
                SSL Seguro
              </div>
              <div className="bg-white rounded p-2 flex items-center gap-1.5 text-xs font-bold text-blue-700 flex-1 shadow-sm">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Site Seguro
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Ferramentas Valfre. Todos os direitos reservados.</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <p>CNPJ: 52.749.158/0001-62 — Ferramentas Valfre</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
