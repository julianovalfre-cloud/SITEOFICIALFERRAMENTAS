import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function PoliticaDevolucao() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold opacity-100">Trocas e Devoluções</span>
          </div>
          <h1 className="text-3xl font-bold">Política de Trocas e Devoluções</h1>
        </div>
      </div>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-green-800">
            <strong>Garantia legal:</strong> Conforme o Código de Defesa do Consumidor (CDC — Lei nº 8.078/1990), você tem direito a arrependimento em até <strong>7 dias corridos</strong> da entrega, e garantia legal de 90 dias para produtos não duráveis e 6 meses para produtos duráveis.
          </div>

          <section>
            <h2 className="text-xl font-bold text-primary">1. Direito de Arrependimento (7 dias)</h2>
            <p>Você pode desistir da compra em até <strong>7 dias corridos</strong> a partir do recebimento do produto, sem necessidade de justificativa, conforme Art. 49 do CDC.</p>
            <h3 className="font-bold mt-4">Como solicitar:</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Entre em contato pelo WhatsApp (27) 99999-9999 ou e-mail <strong>trocas@ferramentasvalfre.com.br</strong></li>
              <li>Informe o número do pedido e o motivo da devolução;</li>
              <li>Aguarde as instruções de envio — o frete de retorno é por nossa conta;</li>
              <li>O reembolso é processado em até <strong>7 dias úteis</strong> após o recebimento e conferência do produto.</li>
            </ol>
            <h3 className="font-bold mt-4">Condições:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Produto com embalagem original, sem uso e sem sinais de violação;</li>
              <li>Acompanhado de todos os acessórios, manuais e nota fiscal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">2. Produto com Defeito</h2>
            <p>Em caso de produto com defeito de fabricação:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Prazo para reclamação:</strong> 90 dias (não duráveis) ou 180 dias (duráveis) após o recebimento;</li>
              <li>Entre em contato com fotos/vídeos do defeito;</li>
              <li>Faremos a análise e, confirmado o defeito, providenciaremos reparo, substituição ou reembolso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">3. Produto Errado ou Avariado no Transporte</h2>
            <p>Se receber um produto diferente do pedido ou com avaria de transporte:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Fotografe o produto e a embalagem antes de abrir completamente;</li>
              <li>Contate-nos em até <strong>48 horas</strong> do recebimento;</li>
              <li>Reenviaremos o produto correto ou realizaremos o reembolso integral.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">4. Formas de Reembolso</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cartão de crédito:</strong> estorno na fatura em 1 a 2 ciclos de faturamento;</li>
              <li><strong>PIX:</strong> transferência em até 3 dias úteis;</li>
              <li><strong>Boleto:</strong> depósito bancário em até 5 dias úteis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">5. Itens não Elegíveis para Devolução</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Produtos com sinais de uso indevido ou dano por negligência do consumidor;</li>
              <li>Produtos com lacre violado (quando aplicável por higiene/segurança);</li>
              <li>Itens perecíveis ou consumíveis já abertos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">6. Contato para Trocas</h2>
            <p>
              📱 WhatsApp: <strong>(27) 99999-9999</strong><br />
              📧 E-mail: <strong>trocas@ferramentasvalfre.com.br</strong><br />
              🕐 Atendimento: Segunda a Sexta, 8h às 18h
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
