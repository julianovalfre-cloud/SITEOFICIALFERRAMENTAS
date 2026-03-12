import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronRight, Truck, MapPin, Clock, Package } from "lucide-react";
import { Link } from "wouter";

export default function PoliticaEntrega() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold opacity-100">Política de Entrega</span>
          </div>
          <h1 className="text-3xl font-bold">Política de Entrega e Frete</h1>
        </div>
      </div>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="space-y-8 text-slate-700">

          {/* Cards de destaque */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Truck, color: "bg-blue-50 border-blue-200 text-blue-700", title: "Entrega Nacional", desc: "Enviamos para todo o Brasil pelos Correios e transportadoras parceiras." },
              { icon: MapPin, color: "bg-secondary/10 border-secondary/30 text-secondary", title: "Entrega Expressa", desc: "Para Cariacica, Viana, Vitória e Serra: entrega em até 24 horas úteis." },
              { icon: Package, color: "bg-green-50 border-green-200 text-green-700", title: "Retirada Grátis", desc: "Retire gratuitamente na nossa loja em Cariacica — ES." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className={`border rounded-xl p-5 ${color}`}>
                <Icon className="w-7 h-7 mb-3" />
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <section className="prose prose-slate max-w-none">
            <h2 className="text-xl font-bold text-primary">1. Modalidades de Entrega</h2>

            <h3 className="font-bold text-base mt-4">1.1 Entrega Expressa — Grande Vitória (ES)</h3>
            <p>Para os municípios de <strong>Cariacica, Viana, Vitória e Serra</strong>, oferecemos entrega expressa com prazo de <strong>1 dia útil</strong> após a confirmação do pagamento. O valor do frete expresso é calculado no checkout conforme o endereço de entrega.</p>

            <h3 className="font-bold text-base mt-4">1.2 Entrega para Todo o Brasil</h3>
            <p>Trabalhamos com os Correios (PAC e SEDEX) e transportadoras. Os prazos variam de acordo com a região:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left p-3">Modalidade</th>
                    <th className="text-left p-3">Prazo Estimado</th>
                    <th className="text-left p-3">Frete Grátis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="even:bg-slate-50"><td className="p-3 font-semibold">Entrega Expressa (Grande Vitória)</td><td className="p-3">1 dia útil</td><td className="p-3">Consultar</td></tr>
                  <tr className="even:bg-slate-50"><td className="p-3 font-semibold">SEDEX (Sudeste)</td><td className="p-3">2–4 dias úteis</td><td className="p-3">Pedidos ≥ R$ 199</td></tr>
                  <tr className="even:bg-slate-50"><td className="p-3 font-semibold">SEDEX (Demais regiões)</td><td className="p-3">3–7 dias úteis</td><td className="p-3">Pedidos ≥ R$ 199</td></tr>
                  <tr className="even:bg-slate-50"><td className="p-3 font-semibold">PAC</td><td className="p-3">5–15 dias úteis</td><td className="p-3">Pedidos ≥ R$ 199</td></tr>
                  <tr className="even:bg-slate-50"><td className="p-3 font-semibold">Retirada na Loja</td><td className="p-3">Disponível em 1 dia útil</td><td className="p-3">Sempre Grátis</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-base mt-6">1.3 Retirada Grátis na Loja</h3>
            <p>Você pode optar por retirar seu pedido gratuitamente em nossa loja física:</p>
            <p>
              📍 <strong>Ferramentas Valfre</strong><br />
              Cariacica — ES, Grande Vitória<br />
              🕐 Segunda a Sexta: 8h às 18h | Sábados: 8h às 12h
            </p>
            <p>Após a confirmação do pagamento, seu pedido ficará disponível para retirada em até <strong>1 dia útil</strong>. Você receberá um aviso por WhatsApp ou e-mail quando estiver pronto.</p>

            <h2 className="text-xl font-bold text-primary mt-8">2. Prazo de Processamento</h2>
            <p>Pedidos pagos por <strong>PIX e cartão de crédito</strong> são processados imediatamente. Pedidos pagos por <strong>boleto bancário</strong> são processados após a confirmação do pagamento (até 3 dias úteis). O prazo de entrega começa a contar a partir do processamento.</p>

            <h2 className="text-xl font-bold text-primary mt-8">3. Rastreamento</h2>
            <p>Após o envio, você receberá o código de rastreio por e-mail e WhatsApp. Acompanhe em tempo real em: <a href="https://melhorrastreio.com.br" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold">melhorrastreio.com.br</a></p>

            <h2 className="text-xl font-bold text-primary mt-8">4. Problemas na Entrega</h2>
            <ul>
              <li><strong>Produto avariado no transporte:</strong> fotografe a embalagem antes de abrir e entre em contato em até 48h;</li>
              <li><strong>Atraso na entrega:</strong> verifique o rastreio e, se necessário, contate-nos;</li>
              <li><strong>Endereço incorreto:</strong> informado pelo cliente, uma nova entrega poderá ser cobrada.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8">5. Regiões de Difícil Acesso</h2>
            <p>Algumas regiões podem ter prazo estendido e custos de frete diferenciados. O valor exato será calculado no checkout com base no CEP informado.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
