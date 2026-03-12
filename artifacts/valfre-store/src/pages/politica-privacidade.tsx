import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary text-white py-8 border-b-4 border-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center text-sm opacity-70 mb-3 gap-1.5">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold opacity-100">Política de Privacidade</span>
          </div>
          <h1 className="text-3xl font-bold">Política de Privacidade</h1>
        </div>
      </div>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
            <strong>Última atualização:</strong> Janeiro de 2026. Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </div>

          <section>
            <h2 className="text-xl font-bold text-primary">1. Identificação do Controlador</h2>
            <p>
              <strong>Razão Social:</strong> Ferramentas Valfre LTDA<br />
              <strong>CNPJ:</strong> 52.749.158/0001-62<br />
              <strong>Endereço:</strong> Cariacica — ES, Grande Vitória<br />
              <strong>E-mail de contato (DPO):</strong> privacidade@ferramentasvalfre.com.br<br />
              <strong>Telefone:</strong> (27) 99999-9999
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">2. Dados Coletados</h2>
            <p>Coletamos os seguintes dados pessoais para prestação dos nossos serviços:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Dados de identificação:</strong> nome completo, CPF ou CNPJ, data de nascimento;</li>
              <li><strong>Dados de contato:</strong> endereço de e-mail, número de telefone/WhatsApp;</li>
              <li><strong>Dados de endereço:</strong> CEP, logradouro, número, complemento, bairro, cidade e estado;</li>
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, páginas acessadas, tempo de permanência;</li>
              <li><strong>Dados de pagamento:</strong> processados por gateway certificado PCI-DSS (Mercado Pago). Não armazenamos dados completos de cartões.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">3. Finalidade do Tratamento</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Processamento e entrega de pedidos;</li>
              <li>Comunicação sobre status de pagamento, envio e entrega;</li>
              <li>Atendimento ao cliente e resolução de reclamações;</li>
              <li>Emissão de nota fiscal e cumprimento de obrigações legais/tributárias;</li>
              <li>Envio de ofertas e promoções (mediante consentimento);</li>
              <li>Prevenção de fraudes e segurança da plataforma;</li>
              <li>Melhoria da experiência de navegação e personalização.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">4. Base Legal</h2>
            <p>O tratamento de dados é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Execução de contrato</strong> — para processar e entregar pedidos;</li>
              <li><strong>Obrigação legal</strong> — para cumprir exigências fiscais e regulatórias;</li>
              <li><strong>Consentimento</strong> — para envio de comunicações de marketing;</li>
              <li><strong>Interesse legítimo</strong> — para prevenção de fraudes e melhoria de serviços.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">5. Compartilhamento de Dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Transportadoras e Correios</strong> — para entrega dos produtos;</li>
              <li><strong>Mercado Pago</strong> — gateway de pagamento;</li>
              <li><strong>Tiny ERP</strong> — sistema de gestão de pedidos e estoque;</li>
              <li><strong>Autoridades públicas</strong> — quando exigido por lei.</li>
            </ul>
            <p>Não vendemos, alugamos ou cedemos seus dados a terceiros para fins comerciais.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">6. Seus Direitos (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Confirmação da existência de tratamento de seus dados;</li>
              <li>Acesso aos dados que temos sobre você;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Eliminação dos dados tratados com base em consentimento;</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato: <strong>privacidade@ferramentasvalfre.com.br</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">7. Cookies</h2>
            <p>Utilizamos cookies essenciais para o funcionamento da loja (sessão de carrinho), cookies analíticos para entender o comportamento de navegação, e cookies de marketing (somente com seu consentimento). Você pode gerenciar os cookies nas configurações do seu navegador.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">8. Segurança</h2>
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados: criptografia SSL/TLS em todas as transmissões, controle de acesso restrito, monitoramento de segurança e política de resposta a incidentes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary">9. Alterações desta Política</h2>
            <p>Podemos atualizar esta política a qualquer momento. Alterações significativas serão comunicadas por e-mail ou aviso em destaque no site. A data de última atualização estará sempre indicada no topo deste documento.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
