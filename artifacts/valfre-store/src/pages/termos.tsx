import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Termos() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold opacity-100">Termos de Uso</span>
          </div>
          <h1 className="text-3xl font-bold">Termos de Uso e Condições Gerais</h1>
        </div>
      </div>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm">
            <strong>Última atualização:</strong> Janeiro de 2026. Ao acessar e utilizar este site, você concorda com estes Termos de Uso.
          </div>

          <section>
            <h2 className="text-xl font-bold text-primary">1. Identificação</h2>
            <p>
              O site ferramentasvalfre.com.br é operado por <strong>Ferramentas Valfre LTDA</strong>, CNPJ: <strong>52.749.158/0001-62</strong>, com sede em Cariacica — ES.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">2. Aceitação dos Termos</h2>
            <p>Ao navegar neste site, criar uma conta ou realizar uma compra, você concorda integralmente com estes Termos de Uso e nossa <Link href="/politica-privacidade" className="text-secondary">Política de Privacidade</Link>. Caso não concorde, por favor, não utilize nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">3. Cadastro e Conta do Usuário</h2>
            <ul>
              <li>Você deve fornecer informações verdadeiras, precisas e completas no cadastro;</li>
              <li>É responsável por manter a confidencialidade de sua senha e conta;</li>
              <li>Notifique-nos imediatamente sobre qualquer uso não autorizado;</li>
              <li>Reservamo-nos o direito de encerrar contas com informações falsas ou uso indevido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">4. Produtos e Preços</h2>
            <ul>
              <li>Todos os preços são em Reais (BRL) e incluem impostos;</li>
              <li>Os preços podem ser alterados sem aviso prévio;</li>
              <li>Erros de preço evidentes (ex: R$ 0,01 para um produto de R$ 500) não são vinculantes;</li>
              <li>A disponibilidade de estoque é verificada no momento da finalização do pedido;</li>
              <li>Imagens dos produtos são meramente ilustrativas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">5. Pedidos e Contrato de Compra</h2>
            <p>O pedido constitui uma oferta de compra. O contrato de compra e venda é celebrado somente após:</p>
            <ol>
              <li>Confirmação do pedido por e-mail;</li>
              <li>Aprovação do pagamento pelo gateway Mercado Pago;</li>
              <li>Disponibilidade do produto em estoque.</li>
            </ol>
            <p>Reservamo-nos o direito de cancelar pedidos suspeitos de fraude, com dados incorretos, ou em caso de indisponibilidade de estoque, com reembolso integral.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">6. Pagamentos</h2>
            <p>Aceitamos as formas de pagamento disponibilizadas pelo Mercado Pago: cartão de crédito (parcelado em até 12x), cartão de débito, PIX, boleto bancário e saldo Mercado Pago. A aprovação do pagamento é de responsabilidade do gateway e pode levar alguns minutos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">7. Propriedade Intelectual</h2>
            <p>Todo o conteúdo deste site — incluindo textos, imagens, logotipos, marcas, layouts e código — é protegido por direitos autorais e de propriedade intelectual. É proibida a reprodução, distribuição ou modificação sem autorização expressa da Ferramentas Valfre.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">8. Limitação de Responsabilidade</h2>
            <p>A Ferramentas Valfre não se responsabiliza por:</p>
            <ul>
              <li>Danos causados pelo uso incorreto dos produtos;</li>
              <li>Falhas em redes de internet ou sistemas de terceiros;</li>
              <li>Atrasos causados por transportadoras ou Correios;</li>
              <li>Dados inseridos incorretamente pelo usuário no cadastro ou no pedido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">9. Foro e Legislação Aplicável</h2>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão submetidas ao foro da comarca de <strong>Cariacica — ES</strong>, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">10. Contato</h2>
            <p>
              Para dúvidas sobre estes termos:<br />
              📧 <strong>juridico@ferramentasvalfre.com.br</strong><br />
              📱 <strong>(27) 99999-9999</strong>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
