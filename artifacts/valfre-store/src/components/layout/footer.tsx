import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="flex flex-col gap-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Valfre Store" className="h-12 object-contain object-left w-max mb-2 bg-white/10 p-2 rounded-lg" />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A Ferramentas Valfre é a sua parceira ideal para obras, manutenções e projetos. Equipamentos profissionais com o melhor preço do mercado.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider">Atendimento</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-bold text-white">(11) 9999-9999</p>
                  <p className="text-xs">Seg a Sex: 8h às 18h</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <p>contato@ferramentasvalfre.com.br</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p>Av. das Indústrias, 1000<br/>São Paulo - SP</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider">Institucional</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/sobre" className="hover:text-secondary transition-colors">Quem Somos</Link></li>
              <li><Link href="/lojas" className="hover:text-secondary transition-colors">Nossas Lojas</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-secondary transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/trocas" className="hover:text-secondary transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/garantia" className="hover:text-secondary transition-colors">Garantia de Produtos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider">Pagamento Seguro</h3>
            <div className="grid grid-cols-4 gap-2 opacity-80 mb-6">
              {/* Fake payment icons */}
              <div className="h-8 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
              <div className="h-8 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">MASTER</div>
              <div className="h-8 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">PIX</div>
              <div className="h-8 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">BOLETO</div>
            </div>
            <h3 className="text-lg font-bold mb-4 font-display uppercase tracking-wider">Certificados</h3>
            <div className="flex gap-4">
              <div className="h-12 w-12 border border-white/20 rounded-full flex items-center justify-center text-xs text-center font-bold text-green-400">SSL<br/>Safe</div>
              <div className="h-12 w-12 border border-white/20 rounded-full flex items-center justify-center text-xs text-center font-bold">Google<br/>Safe</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Ferramentas Valfre. Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}
