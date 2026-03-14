import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  User, ShoppingBag, MapPin, Heart, MessageCircle, HelpCircle,
  Building2, Ticket, ShieldCheck, Star, Lock, LogOut, ChevronRight,
  Package, CheckCircle2, Clock, AlertCircle, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = "dashboard" | "pedidos" | "dados" | "enderecos" | "favoritos" | "cupons" | "garantias" | "avaliacoes" | "atendimento" | "privacidade";

const MENU_ITEMS: { key: Tab; icon: any; label: string; badge?: string }[] = [
  { key: "dashboard", icon: User, label: "Minha Conta" },
  { key: "pedidos", icon: ShoppingBag, label: "Meus Pedidos", badge: "2" },
  { key: "dados", icon: User, label: "Dados Cadastrais" },
  { key: "enderecos", icon: MapPin, label: "Meus Endereços" },
  { key: "favoritos", icon: Heart, label: "Favoritos" },
  { key: "cupons", icon: Ticket, label: "Cupons e Vales" },
  { key: "garantias", icon: ShieldCheck, label: "Minhas Garantias" },
  { key: "avaliacoes", icon: Star, label: "Minhas Avaliações" },
  { key: "atendimento", icon: MessageCircle, label: "Atendimento" },
  { key: "privacidade", icon: Lock, label: "Minha Privacidade" },
];

const MOCK_ORDERS = [
  { id: "VF-2026-001", date: "10/03/2026", status: "entregue", total: 389.90, items: 2 },
  { id: "VF-2026-002", date: "12/03/2026", status: "em_transito", total: 189.90, items: 1 },
  { id: "VF-2026-003", date: "14/03/2026", status: "aguardando", total: 729.00, items: 3 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; icon: any }> = {
    entregue: { label: "Entregue", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
    em_transito: { label: "Em Trânsito", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
    aguardando: { label: "Aguardando Pagamento", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
    cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle },
  };
  const s = map[status] || map.aguardando;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
      <Icon className="w-3 h-3" /> {s.label}
    </span>
  );
}

export default function MinhaContaPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const user = { name: "João da Silva", email: "j***@gmail.com", cpf: "***.***.***-12" };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="bg-primary text-white py-6 border-b-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black">
              {user.name[0]}
            </div>
            <div>
              <div className="font-black text-lg">Olá, {user.name.split(" ")[0]}! 👋</div>
              <div className="text-white/60 text-sm">{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <aside className="md:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {MENU_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors text-left ${
                      i < MENU_ITEMS.length - 1 ? "border-b border-slate-50" : ""
                    } ${
                      tab === item.key
                        ? "bg-secondary text-white"
                        : "text-slate-700 hover:bg-slate-50 hover:text-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${tab === item.key ? 'bg-white text-secondary' : 'bg-secondary text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                    {tab !== item.key && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors border-t border-slate-100">
                <LogOut className="w-4 h-4" />
                Sair da Conta
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Dashboard */}
            {tab === "dashboard" && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-primary">Visão Geral</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: ShoppingBag, label: "Pedidos", value: "3", color: "bg-blue-50 text-blue-600" },
                    { icon: Package, label: "Em Trânsito", value: "1", color: "bg-amber-50 text-amber-600" },
                    { icon: Heart, label: "Favoritos", value: "8", color: "bg-red-50 text-red-500" },
                    { icon: Star, label: "Avaliações", value: "2", color: "bg-amber-50 text-amber-500" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
                      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-primary">{value}</div>
                      <div className="text-xs text-slate-400 font-medium">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="font-bold text-sm text-slate-600 mb-4 uppercase tracking-wider">Último Pedido</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-primary">{MOCK_ORDERS[1].id}</div>
                      <div className="text-sm text-slate-500">{MOCK_ORDERS[1].items} item(s) · {MOCK_ORDERS[1].date}</div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={MOCK_ORDERS[1].status} />
                      <div className="text-lg font-black text-primary mt-1">R$ {MOCK_ORDERS[1].total.toFixed(2).replace('.', ',')}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-slate-200 font-bold text-sm" onClick={() => setTab("pedidos")}>
                    Ver todos os pedidos <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-secondary to-orange-500 rounded-2xl p-6 text-white">
                  <div className="text-sm font-bold opacity-80 mb-1">Precisa de ajuda?</div>
                  <div className="font-black text-lg mb-3">Fale com a Valfre no WhatsApp</div>
                  <a
                    href="https://wa.me/5527999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-secondary font-black px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors"
                  >
                    💬 Abrir WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Pedidos */}
            {tab === "pedidos" && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-primary">Meus Pedidos</h2>
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-secondary/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-black text-primary text-base">{order.id}</div>
                        <div className="text-sm text-slate-500 mt-0.5">{order.items} produto(s) · Realizado em {order.date}</div>
                        <div className="mt-2"><StatusBadge status={order.status} /></div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xl font-black text-primary">R$ {order.total.toFixed(2).replace('.', ',')}</div>
                        <Button size="sm" variant="outline" className="mt-2 border-slate-200 text-xs font-bold">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    {order.status === "em_transito" && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <a href="https://melhorrastreio.com.br" target="_blank" rel="noopener noreferrer" className="text-secondary text-sm font-bold flex items-center gap-1.5 hover:underline">
                          📦 Rastrear pedido <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Dados */}
            {tab === "dados" && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-primary">Dados Cadastrais</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  Para alterar e-mail, senha ou CPF, enviaremos um código de verificação por segurança.
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                  {[
                    { label: "Nome Completo", value: user.name, editable: true },
                    { label: "E-mail", value: user.email, editable: true, secure: true },
                    { label: "Celular", value: "(27) 9****-9999", editable: true, secure: true },
                    { label: "CPF", value: user.cpf, editable: false },
                  ].map(({ label, value, editable, secure }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">{label}</div>
                        <div className="font-semibold text-slate-800">{value}</div>
                      </div>
                      {editable && (
                        <Button variant="outline" size="sm" className={`border-slate-200 text-xs font-bold ${secure ? 'text-amber-600 border-amber-200' : ''}`}>
                          {secure ? "🔐 Alterar" : "Editar"}
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}

            {/* Privacidade */}
            {tab === "privacidade" && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-primary">Minha Privacidade</h2>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                  <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Preferências de Comunicação</h3>
                  {[
                    { label: "E-mails promocionais", desc: "Receber ofertas e novidades por e-mail" },
                    { label: "SMS / WhatsApp", desc: "Receber mensagens sobre pedidos e promoções" },
                    { label: "Personalização", desc: "Usar histórico para personalizar recomendações" },
                  ].map(({ label, desc }) => (
                    <label key={label} className="flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{label}</div>
                        <div className="text-xs text-slate-400">{desc}</div>
                      </div>
                      <input type="checkbox" className="accent-orange-500 w-4 h-4" defaultChecked />
                    </label>
                  ))}
                  <div className="pt-4 border-t border-slate-100">
                    <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 font-bold text-sm">
                      Solicitar Exclusão de Dados
                    </Button>
                    <p className="text-xs text-slate-400 mt-2">Conforme LGPD, você pode solicitar a exclusão dos seus dados pessoais.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <Link href="/politica-privacidade" className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-secondary">
                    📄 Ver Política de Privacidade Completa <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Empty states for other tabs */}
            {["favoritos", "cupons", "garantias", "avaliacoes", "enderecos", "atendimento"].includes(tab) && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
                <div className="text-5xl mb-4">
                  {tab === "favoritos" ? "❤️" : tab === "cupons" ? "🎟️" : tab === "garantias" ? "🛡️" : tab === "avaliacoes" ? "⭐" : tab === "enderecos" ? "📍" : "💬"}
                </div>
                <h3 className="text-lg font-black text-slate-700 mb-2 capitalize">
                  {MENU_ITEMS.find(m => m.key === tab as Tab)?.label}
                </h3>
                <p className="text-slate-400 text-sm mb-6">Nenhum item encontrado ainda.</p>
                <Link href="/">
                  <Button className="bg-secondary text-white font-bold">
                    Explorar produtos <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
