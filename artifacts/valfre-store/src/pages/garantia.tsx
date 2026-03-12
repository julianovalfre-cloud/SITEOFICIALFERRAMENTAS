import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Garantia() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold opacity-100">Garantia de Produtos</span>
          </div>
          <h1 className="text-3xl font-bold">Garantia de Produtos</h1>
        </div>
      </div>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5 flex gap-4">
            <ShieldCheck className="w-8 h-8 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 m-0">
              Todos os produtos vendidos pela Ferramentas Valfre possuem garantia legal mínima conforme o Código de Defesa do Consumidor, além das garantias adicionais oferecidas pelos fabricantes.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-primary">1. Garantia Legal (CDC)</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Produtos não duráveis:</strong> 30 dias a partir da data de entrega;</li>
              <li><strong>Produtos duráveis (ferramentas, equipamentos):</strong> 90 dias a partir da data de entrega.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">2. Garantia do Fabricante</h2>
            <p>As principais marcas oferecem garantias adicionais:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left p-3 font-bold">Marca</th>
                    <th className="text-left p-3 font-bold">Garantia</th>
                    <th className="text-left p-3 font-bold">Contato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Bosch", "12 meses", "0800-701-2629"],
                    ["Makita", "12 meses", "0800-772-8282"],
                    ["DeWalt", "12 meses", "0800-701-0100"],
                    ["Tramontina", "12 meses", "0800-644-7888"],
                    ["Gedore", "12 meses", "(11) 4785-7900"],
                    ["Vonder", "12 meses", "(41) 3317-7000"],
                    ["Black+Decker", "12 meses", "0800-727-1000"],
                  ].map(([marca, g, tel]) => (
                    <tr key={marca} className="even:bg-slate-50">
                      <td className="p-3 font-semibold">{marca}</td>
                      <td className="p-3">{g}</td>
                      <td className="p-3 text-slate-500">{tel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-2">Consulte o manual do produto para informações específicas de garantia.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">3. O que Cobre a Garantia</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Defeitos de fabricação e materiais;</li>
              <li>Falhas de funcionamento em condições normais de uso;</li>
              <li>Problemas elétricos/mecânicos não causados pelo usuário.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">4. O que NÃO Cobre a Garantia</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Danos causados por uso inadequado, acidente ou negligência;</li>
              <li>Desgaste natural das peças (escovas, lâminas, discos);</li>
              <li>Danos causados por tensão elétrica incorreta;</li>
              <li>Modificações ou reparos realizados por terceiros não autorizados;</li>
              <li>Ferrugem e corrosão por armazenamento incorreto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">5. Como Acionar a Garantia</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Entre em contato conosco: WhatsApp <strong>(27) 99999-9999</strong> ou <strong>garantia@ferramentasvalfre.com.br</strong></li>
              <li>Informe o número do pedido, nota fiscal e descrição detalhada do problema;</li>
              <li>Envie fotos ou vídeo demonstrando o defeito;</li>
              <li>Avaliaremos e orientaremos sobre envio para assistência técnica autorizada ou substituição.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">6. Prazo de Atendimento</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Resposta inicial: até <strong>24 horas úteis</strong>;</li>
              <li>Reparo ou substituição: até <strong>30 dias corridos</strong> após o diagnóstico.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
