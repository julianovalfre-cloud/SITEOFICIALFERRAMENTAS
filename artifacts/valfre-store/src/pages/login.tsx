import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Building2, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";

type Mode = "login" | "register-personal" | "register-business" | "choose";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPass, setShowPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

            {/* Top brand strip */}
            <div className="bg-primary px-8 py-6 text-white text-center">
              <div className="text-xs font-black tracking-[0.3em] uppercase text-white/60 mb-1">Ferramentas</div>
              <div className="text-2xl font-black tracking-tight">VALFRE</div>
              <p className="text-white/70 text-sm mt-1">
                {mode === "login" && "Acesse sua conta"}
                {mode === "choose" && "Como deseja se cadastrar?"}
                {mode === "register-personal" && "Criar conta pessoal"}
                {mode === "register-business" && "Criar conta empresarial"}
              </p>
            </div>

            <div className="px-8 py-7">
              {/* ── LOGIN ── */}
              {mode === "login" && (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label>E-mail</Label>
                      <Input type="email" placeholder="seu@email.com" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Senha</Label>
                      <div className="relative mt-1.5">
                        <Input type={showPass ? "text" : "password"} placeholder="••••••••" className="h-11 pr-11" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPass(v => !v)}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="text-right mt-1">
                        <a href="#" className="text-xs text-secondary font-semibold hover:underline">Esqueci minha senha</a>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold text-base mb-4">
                    Entrar na Conta
                  </Button>
                  <div className="text-center text-sm text-slate-500">
                    Não tem conta?{" "}
                    <button className="text-secondary font-bold hover:underline" onClick={() => setMode("choose")}>
                      Cadastre-se grátis
                    </button>
                  </div>
                </>
              )}

              {/* ── CHOOSE ACCOUNT TYPE ── */}
              {mode === "choose" && (
                <>
                  <button onClick={() => setMode("login")} className="flex items-center gap-1.5 text-slate-400 hover:text-secondary text-sm font-semibold mb-6 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setMode("register-personal")}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-slate-200 hover:border-secondary rounded-2xl transition-all hover:bg-secondary/5 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <User className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-sm text-slate-800">Conta Pessoal</div>
                        <div className="text-xs text-slate-400 mt-0.5">Para uso individual</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setMode("register-business")}
                      className="flex flex-col items-center gap-3 p-5 border-2 border-slate-200 hover:border-secondary rounded-2xl transition-all hover:bg-secondary/5 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Building2 className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-sm text-slate-800">Conta Empresa</div>
                        <div className="text-xs text-slate-400 mt-0.5">Para PJ e construtoras</div>
                      </div>
                    </button>
                  </div>
                  <div className="text-center text-sm text-slate-500">
                    Já tem conta?{" "}
                    <button className="text-secondary font-bold hover:underline" onClick={() => setMode("login")}>
                      Fazer login
                    </button>
                  </div>
                </>
              )}

              {/* ── REGISTER PERSONAL ── */}
              {mode === "register-personal" && (
                <>
                  <button onClick={() => setMode("choose")} className="flex items-center gap-1.5 text-slate-400 hover:text-secondary text-sm font-semibold mb-5 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Tipo de conta
                  </button>
                  <div className="space-y-4 mb-5">
                    <div>
                      <Label>Nome Completo</Label>
                      <Input placeholder="João da Silva" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Celular / WhatsApp</Label>
                      <Input placeholder="(27) 99999-9999" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input type="email" placeholder="seu@email.com" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Senha</Label>
                      <div className="relative mt-1.5">
                        <Input type={showPass ? "text" : "password"} placeholder="Mínimo 8 caracteres" className="h-11 pr-11" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPass(v => !v)}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label>Confirmar Senha</Label>
                      <Input type="password" placeholder="Repita a senha" className="mt-1.5 h-11" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-orange-500" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Concordo com os <Link href="/termos" className="text-secondary font-semibold hover:underline">Termos de Uso</Link> e a{" "}
                        <Link href="/politica-privacidade" className="text-secondary font-semibold hover:underline">Política de Privacidade</Link>
                      </span>
                    </label>
                  </div>
                  <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold text-base" disabled={!acceptTerms}>
                    Criar Conta <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}

              {/* ── REGISTER BUSINESS ── */}
              {mode === "register-business" && (
                <>
                  <button onClick={() => setMode("choose")} className="flex items-center gap-1.5 text-slate-400 hover:text-secondary text-sm font-semibold mb-5 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Tipo de conta
                  </button>
                  <div className="space-y-4 mb-5">
                    <div>
                      <Label>CNPJ</Label>
                      <Input placeholder="00.000.000/0001-00" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Razão Social</Label>
                      <Input placeholder="Empresa LTDA" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Telefone Comercial</Label>
                      <Input placeholder="(27) 3000-0000" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>E-mail para Nota Fiscal</Label>
                      <Input type="email" placeholder="nf@empresa.com.br" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Inscrição Estadual</Label>
                      <Input placeholder="000.000.00-0 (ou Isento)" className="mt-1.5 h-11" />
                    </div>
                    <div>
                      <Label>Senha</Label>
                      <div className="relative mt-1.5">
                        <Input type={showPass ? "text" : "password"} placeholder="Mínimo 8 caracteres" className="h-11 pr-11" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowPass(v => !v)}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-orange-500" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Concordo com os <Link href="/termos" className="text-secondary font-semibold hover:underline">Termos de Uso</Link> e a{" "}
                        <Link href="/politica-privacidade" className="text-secondary font-semibold hover:underline">Política de Privacidade</Link>
                      </span>
                    </label>
                  </div>
                  <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold text-base" disabled={!acceptTerms}>
                    Criar Conta Empresa <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Dados protegidos por criptografia SSL
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
