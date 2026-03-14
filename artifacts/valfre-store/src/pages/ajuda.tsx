import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Search, ChevronDown, ChevronUp, ChevronRight, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { icon: "📦", label: "Meu Pedido", key: "pedido" },
  { icon: "💳", label: "Pagamento", key: "pagamento" },
  { icon: "🚚", label: "Entrega e Frete", key: "entrega" },
  { icon: "🔄", label: "Trocas e Devoluções", key: "troca" },
  { icon: "🛡️", label: "Garantia", key: "garantia" },
  { icon: "🔐", label: "Minha Conta", key: "conta" },
  { icon: "🏷️", label: "Produto e Preço", key: "produto" },
  { icon: "💬", label: "Críticas e Sugestões", key: "criticas" },
];

const FAQ: Record<string, { q: string; a: string }[]> = {
  pedido: [
    { q: "Como rastrear meu pedido?", a: "Após o envio, você recebe o código de rastreio por e-mail e WhatsApp. Acesse melhorrastreio.com.br e insira o código para acompanhar em tempo real." },
    { q: "Posso cancelar meu pedido?", a: "Sim! Pedidos ainda não expedidos podem ser cancelados. Entre em contato pelo WhatsApp (27) 99999-9999. Após o envio, o cancelamento segue o processo de devolução." },
    { q: "Posso alterar o endereço de entrega?", a: "É possível alterar antes da expedição. Contate-nos o mais rápido possível pelo WhatsApp para solicitarmos a alteração." },
    { q: "Quanto tempo demora para meu pedido ser processado?", a: "Pagamentos por PIX e cartão são processados imediatamente. Boleto bancário leva até 3 dias úteis. Após a aprovação, iniciamos o processamento em até 1 dia útil." },
  ],
  pagamento: [
    { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos cartão de crédito (parcelado em até 12x), cartão de débito, PIX (com desconto especial de 5%), boleto bancário e saldo Mercado Pago." },
    { q: "O PIX tem desconto?", a: "Sim! Ao pagar via PIX você recebe 5% de desconto automático sobre o valor total do pedido." },
    { q: "Meu pagamento foi recusado. O que fazer?", a: "Verifique se os dados do cartão estão corretos, se há limite disponível e se o cartão está habilitado para compras online. Se o problema persistir, tente outro método de pagamento ou contate seu banco." },
    { q: "Posso parcelar em quantas vezes?", a: "Você pode parcelar em até 12x no cartão de crédito. Os juros dependem do seu banco emissor." },
  ],
  entrega: [
    { q: "Qual o prazo de entrega para minha cidade?", a: "O prazo varia por região. Para Cariacica, Viana, Vitória e Serra temos entrega expressa em até 1 dia útil. Para o restante do Brasil, de 3 a 15 dias úteis dependendo da modalidade escolhida." },
    { q: "O frete é grátis?", a: "Sim! Pedidos acima de R$ 199,00 têm frete grátis para todo o Brasil (SEDEX ou PAC conforme a região). Retirada na loja em Cariacica é sempre gratuita." },
    { q: "Posso retirar na loja?", a: "Sim! Oferecemos retirada gratuita na nossa loja em Cariacica — ES. Seu pedido fica disponível em até 1 dia útil após a confirmação do pagamento." },
    { q: "O que fazer se meu produto chegar avariado?", a: "Fotografe a embalagem e o produto antes de abrir completamente e nos contate em até 48h pelo WhatsApp. Providenciaremos a reposição imediatamente." },
  ],
  troca: [
    { q: "Qual o prazo para solicitar troca ou devolução?", a: "Você tem 7 dias corridos após o recebimento para exercer o direito de arrependimento (sem precisar justificar). Para produtos com defeito, o prazo é de 90 dias." },
    { q: "Como solicitar uma troca?", a: "Entre em contato pelo WhatsApp (27) 99999-9999 ou pelo e-mail trocas@ferramentasvalfre.com.br com o número do pedido e o motivo. Organizamos a coleta ou o envio." },
    { q: "Quem paga o frete de devolução?", a: "Nos casos de defeito ou produto errado, nós arcamos com o custo do frete de retorno. Para arrependimento, verifique as condições na nossa Política de Trocas." },
    { q: "Em quanto tempo recebo o reembolso?", a: "Após receber e conferir o produto: cartão de crédito em 1–2 ciclos, PIX em até 3 dias úteis, boleto em até 5 dias úteis." },
  ],
  garantia: [
    { q: "Qual é a garantia dos produtos?", a: "Todos os produtos têm garantia legal de 90 dias (produtos duráveis) mais a garantia adicional do fabricante, que geralmente é de 12 meses para as principais marcas como Bosch, Makita e DeWalt." },
    { q: "Como acionar a garantia?", a: "Entre em contato pelo WhatsApp ou e-mail com fotos/vídeo do defeito e o número do pedido. Avaliamos em até 24h úteis." },
    { q: "A garantia cobre desgaste natural?", a: "Não. A garantia cobre defeitos de fabricação. Peças de desgaste (escovas, lâminas, discos) não são cobertas." },
  ],
  conta: [
    { q: "Esqueci minha senha. Como recuperar?", a: "Na tela de login, clique em 'Esqueci minha senha' e informe seu e-mail. Enviaremos um link para redefinição." },
    { q: "Como alterar meu e-mail ou telefone?", a: "Por segurança, enviaremos um código de verificação para confirmar qualquer alteração de dados sensíveis. Acesse Minha Conta > Dados Cadastrais." },
    { q: "Como excluir minha conta?", a: "Acesse Minha Conta > Minha Privacidade > Solicitar Exclusão de Dados. Processamos sua solicitação em até 15 dias conforme a LGPD." },
  ],
  produto: [
    { q: "Os produtos são originais?", a: "Sim! Trabalhamos apenas com produtos originais, diretamente dos fabricantes ou distribuidores autorizados, com nota fiscal e garantia." },
    { q: "Posso confiar nos preços do site?", a: "Sim. Nossos preços são atualizados regularmente. Em caso de erro de preço evidente, entraremos em contato antes de processar o pedido." },
    { q: "Não encontrei o produto que procuro. O que fazer?", a: "Fale conosco pelo WhatsApp! Nossa equipe pode verificar disponibilidade, prazo de chegada ou indicar um produto equivalente." },
  ],
  criticas: [
    { q: "Como enviar uma sugestão ou reclamação?", a: "Fale conosco pelo e-mail contato@ferramentasvalfre.com.br ou pelo WhatsApp. Levamos todas as sugestões a sério e respondemos em até 48h." },
    { q: "Onde posso avaliar os produtos que comprei?", a: "Após a entrega, você recebe um convite por e-mail para avaliar. Também pode acessar Minha Conta > Minhas Avaliações." },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-slate-200 rounded-xl overflow-hidden transition-all ${open ? 'shadow-sm' : ''}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm transition-colors ${open ? 'bg-primary text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}`}
      >
        {q}
        {open ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
      </button>
      {open && (
        <div className="bg-white px-5 py-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </div>
  );
}

export default function AjudaPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFAQ = activeCategory
    ? FAQ[activeCategory] || []
    : Object.values(FAQ).flat().filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <div className="bg-primary text-white py-14 text-center border-b-4 border-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-black tracking-[0.3em] uppercase text-white/50 mb-3">Como podemos ajudar?</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Central de Ajuda</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar dúvidas, ex: rastrear pedido, frete grátis..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCategory(null); }}
              className="h-14 pl-12 text-base border-0 rounded-2xl shadow-xl text-slate-800"
            />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-10 w-full">

        {/* Category grid */}
        {!search && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(activeCategory === c.key ? null : c.key)}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all font-semibold text-sm ${
                  activeCategory === c.key
                    ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-secondary hover:text-secondary hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ list */}
        <div className="space-y-3">
          {activeCategory && (
            <div className="flex items-center gap-2 mb-5">
              <button onClick={() => setActiveCategory(null)} className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline">
                ← Todas as categorias
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="font-bold text-slate-700 text-sm">
                {CATEGORIES.find(c => c.key === activeCategory)?.icon} {CATEGORIES.find(c => c.key === activeCategory)?.label}
              </span>
            </div>
          )}

          {filteredFAQ.length > 0
            ? filteredFAQ.map((f, i) => <FAQItem key={i} {...f} />)
            : (
              <div className="text-center py-12 text-slate-400">
                <div className="text-4xl mb-3">🔍</div>
                <div className="font-bold">Nenhum resultado encontrado</div>
                <div className="text-sm mt-1">Tente outras palavras ou fale diretamente com a gente.</div>
              </div>
            )
          }
        </div>

        {/* Contact block */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-primary/5 border-b border-slate-100 px-7 py-5">
            <h2 className="text-lg font-black text-primary">Não encontrou o que procurava?</h2>
            <p className="text-sm text-slate-500 mt-0.5">Nossa equipe está pronta para ajudar você.</p>
          </div>
          <div className="p-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: "(27) 99999-9999", href: "https://wa.me/5527999999999", color: "text-green-600 bg-green-50 border-green-200", btn: "Abrir Chat" },
              { icon: Phone, label: "Telefone", value: "(27) 99999-9999", href: "tel:+5527999999999", color: "text-blue-600 bg-blue-50 border-blue-200", btn: "Ligar Agora" },
              { icon: Mail, label: "E-mail", value: "contato@ferramentasvalfre.com.br", href: "mailto:contato@ferramentasvalfre.com.br", color: "text-secondary bg-secondary/10 border-secondary/30", btn: "Enviar E-mail" },
            ].map(({ icon: Icon, label, value, href, color, btn }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 text-center hover:shadow-md transition-all ${color}`}>
                <Icon className="w-7 h-7" />
                <div>
                  <div className="font-black text-sm">{label}</div>
                  <div className="text-xs opacity-80 font-medium mt-0.5">{value}</div>
                </div>
                <span className="text-xs font-black mt-auto border border-current rounded-full px-4 py-1.5">{btn}</span>
              </a>
            ))}
          </div>
          <div className="px-7 pb-5 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-100 pt-4">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            Atendimento: Segunda a Sexta, 8h às 18h | Sábados, 8h às 12h
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
