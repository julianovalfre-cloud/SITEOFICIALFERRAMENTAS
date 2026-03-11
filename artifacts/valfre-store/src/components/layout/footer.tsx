import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ShieldCheck, Lock, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-0 mt-auto">
      
      {/* Newsletter Section */}
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="flex flex-col gap-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Valfre Store" className="h-12 object-contain object-left w-max mb-2 bg-white/10 p-2 rounded-lg" />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A Ferramentas Valfre é a sua parceira ideal para obras, manutenções e projetos. Equipamentos profissionais com o melhor preço do mercado.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider text-white">Atendimento</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-bold text-white text-lg">(11) 9999-9999</p>
                  <p className="text-xs">Seg a Sex: 8h às 18h</p>
                </div>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
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
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider text-white">Institucional</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/sobre" className="hover:text-secondary hover:translate-x-1 inline-block transition-transform">Quem Somos</Link></li>
              <li><Link href="/lojas" className="hover:text-secondary hover:translate-x-1 inline-block transition-transform">Nossas Lojas</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-secondary hover:translate-x-1 inline-block transition-transform">Política de Privacidade</Link></li>
              <li><Link href="/trocas" className="hover:text-secondary hover:translate-x-1 inline-block transition-transform">Trocas e Devoluções</Link></li>
              <li><Link href="/garantia" className="hover:text-secondary hover:translate-x-1 inline-block transition-transform">Garantia de Produtos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 font-display uppercase tracking-wider text-white">Pagamento Seguro</h3>
            <div className="grid grid-cols-5 gap-2 mb-8">
              <div className="h-10 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 38 12" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#1434CB]"><path d="M14.07 11.231l2.253-7.05h3.639l-2.257 7.05h-3.635zm11.758-6.892c-1.018-.328-1.545-.558-1.545-1.026 0-.422.484-.863 1.548-.863 1.258 0 2.052.28 2.656.558l.421-2.457c-.636-.264-1.748-.528-3.093-.528-3.52 0-6.012 1.776-6.035 4.316-.02 1.867 1.748 2.915 3.084 3.541 1.365.64 1.821 1.054 1.821 1.624-.022.871-1.08 1.272-2.072 1.272-1.42 0-2.348-.22-3.083-.556L18.067 12c.74.34 2.046.626 3.424.64 3.738 0 6.168-1.752 6.196-4.475.02-1.503-1.022-2.656-3.859-3.826m10.158-4.137h-2.836c-.846 0-1.517.23-1.892 1.077L26.357 11.23h3.818l.764-2.062h4.646l.437 2.062h3.364l-3.558-11.029zm-3.02 6.643c.272-.72 1.314-3.518 1.314-3.518l.228-.636.388 1.156 1.127 2.998h-3.057zm-22.183-6.643l-3.55 7.643-1.428-6.425C5.642.532 4.453.228 3.033.202L.004.2v1.076c1.942.215 3.447.886 4.606 1.838l3.928 8.117h3.81l5.962-11.029H10.783z"/></svg>
              </div>
              <div className="h-10 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><circle fill="#EB001B" cx="10" cy="10" r="10"/><circle fill="#F79E1B" cx="22" cy="10" r="10"/><path fill="#FF5F00" d="M16 18c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg>
              </div>
              <div className="h-10 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 40 14" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#32BCA5]"><path d="M12.44 1.258L8.794 13.56H4.721l3.645-12.302h4.074zm16.74 0c-.86-1.042-2.29-1.37-3.924-1.37h-6.223L15.39 13.56H19.46l1.246-4.21h2.518c2.946 0 5.176-1.282 5.92-3.805.344-1.162.33-2.316-.206-3.238zm-3.69 4.316c-.365 1.233-1.75 1.758-3.415 1.758h-2.5l1.01-3.415h2.52c1.47 0 2.477.305 2.768 1.294.097.33.056.84-.132 1.353h-.01L25.49 5.57zm12.92-4.312l-2.457 4.542-1.36-4.542h-4.32l3.415 8.163-3.606 5.86h4.3l8.36-14.023h-4.33zM7.054 6.74L4.855 1.258H.242l4.896 9.38L2.574 13.56h4.43l5.05-9.42-5.02 2.6z"/></svg>
              </div>
              <div className="h-10 bg-white rounded flex items-center justify-center px-1 shadow-sm">
                 <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#00529A]"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v4h2V7zm0 6h-2v4h2v-4z"/></svg>
              </div>
              <div className="h-10 bg-white rounded flex items-center justify-center px-1 shadow-sm font-bold text-[#006FCF] text-xs">
                AMEX
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-4 font-display uppercase tracking-wider text-white">Certificados</h3>
            <div className="flex gap-3">
              <div className="bg-white rounded p-2 flex items-center gap-2 text-xs font-bold text-green-700 w-full shadow-sm">
                <Lock className="w-6 h-6 shrink-0" />
                <div className="leading-none">SSL<br/>Safe</div>
              </div>
              <div className="bg-white rounded p-2 flex items-center gap-2 text-xs font-bold text-blue-700 w-full shadow-sm">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <div className="leading-none">Google<br/>Safe</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Ferramentas Valfre. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <p>CNPJ: 00.000.000/0001-00</p>
            <p>Desenvolvido com <Heart className="w-4 h-4 inline text-secondary ml-1" /></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Heart(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
}
