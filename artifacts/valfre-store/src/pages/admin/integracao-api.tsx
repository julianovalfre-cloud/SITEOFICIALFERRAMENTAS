import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2, XCircle, Copy, RefreshCw, Zap, Shield,
  Globe, Key, Terminal, Info, Eye, EyeOff, Loader2,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}`;

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}

function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg"
    >
      <Copy className="w-3.5 h-3.5" />
      {copied ? "Copiado!" : label}
    </button>
  );
}

function StatusBadge({ ok, label }: { ok: boolean | null; label: string }) {
  if (ok === null) return <Badge variant="outline" className="text-muted-foreground">Aguardando</Badge>;
  return ok
    ? <Badge className="bg-green-100 text-green-800 border-green-200">{label}</Badge>
    : <Badge className="bg-red-100 text-red-800 border-red-200">Erro</Badge>;
}

export default function IntegracaoApiPage() {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [tokenPreview, setTokenPreview] = useState<string | null>(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const [generatingToken, setGeneratingToken] = useState(false);
  const [modalToken, setModalToken] = useState<string | null>(null);
  const [showFullToken, setShowFullToken] = useState(false);

  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; data: any } | null>>({});
  const [testingAll, setTestingAll] = useState(false);
  const [testingKey, setTestingKey] = useState<string | null>(null);

  const [authToken, setAuthToken] = useState("");
  const [validateResult, setValidateResult] = useState<any>(null);

  const loadConfig = useCallback(async () => {
    setLoadingConfig(true);
    const { data } = await apiFetch("/api/integration/config");
    setBaseUrl(data.baseUrl || `${window.location.origin}/api`);
    setTokenPreview(data.tokenPreview ?? null);
    setTokenExists(data.tokenExists ?? false);
    setLoadingConfig(false);
  }, []);

  useEffect(() => { loadConfig(); }, [loadConfig]);

  const handleGenerate = async (regenerate = false) => {
    setGeneratingToken(true);
    const endpoint = regenerate ? "/api/integration/regenerate-token" : "/api/integration/generate-token";
    const { ok, data } = await apiFetch(endpoint, { method: "POST" });
    if (ok && data.token) {
      setModalToken(data.token);
      setShowFullToken(true);
      await loadConfig();
      toast.success(regenerate ? "Token regenerado!" : "Token gerado com sucesso!");
    } else {
      toast.error(data.error || "Erro ao gerar token.");
    }
    setGeneratingToken(false);
  };

  const runTest = async (label: string, path: string, method = "GET", headers?: Record<string, string>) => {
    setTestingKey(label);
    const { ok, status, data } = await apiFetch(path, { method, headers });
    setTestResults(prev => ({ ...prev, [label]: { ok, data: { status, ...data } } }));
    setTestingKey(null);
  };

  const runAllTests = async () => {
    setTestingAll(true);
    setTestResults({});
    await runTest("health", "/api/health");
    await runTest("test", "/api/test");
    await runTest("ping", "/api/ping");
    setTestingAll(false);
  };

  const testAuth = async () => {
    const token = authToken.trim() || (modalToken ?? "");
    if (!token) { toast.error("Informe o token primeiro."); return; }
    setTestingKey("auth");
    const { ok, status, data } = await apiFetch("/api/integration/validate", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setValidateResult({ ok, data: { status, ...data } });
    setTestingKey(null);
  };

  const card = "bg-card rounded-2xl border border-border p-6 shadow-sm";
  const sectionTitle = "font-display font-bold text-lg mb-4 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* Page title */}
        <div>
          <h1 className="text-3xl font-display font-black text-foreground mb-1">Integração ERP</h1>
          <p className="text-muted-foreground">Configuração de API para conectar o ERP à loja Valfre.</p>
        </div>

        {/* Card 1 — Status da API */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Zap className="w-5 h-5 text-secondary" /> Status da API
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {["health", "test", "ping"].map(ep => {
              const r = testResults[ep];
              return (
                <div key={ep} className={`rounded-xl border p-4 flex flex-col gap-2 transition-colors ${r ? (r.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200") : "border-border bg-muted/30"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold">/api/{ep}</span>
                    {testingKey === ep
                      ? <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      : r
                        ? r.ok ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />
                        : <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    }
                  </div>
                  {r && (
                    <pre className="text-xs text-muted-foreground bg-white/70 p-2 rounded overflow-auto max-h-20">
                      {JSON.stringify(r.data, null, 2)}
                    </pre>
                  )}
                </div>
              );
            })}
          </div>
          <Button
            onClick={runAllTests}
            disabled={testingAll}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {testingAll ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Testando...</> : <><Zap className="w-4 h-4 mr-2" />Testar todos os endpoints</>}
          </Button>
        </div>

        {/* Card 2 — URL da API */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Globe className="w-5 h-5 text-secondary" /> URL da API
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Use esta URL como <strong>Base URL</strong> nas configurações do ERP.
          </p>
          {loadingConfig ? (
            <div className="h-12 bg-muted animate-pulse rounded-xl" />
          ) : (
            <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
              <code className="flex-1 font-mono text-sm font-bold text-primary break-all">{baseUrl}</code>
              <CopyButton value={baseUrl} label="Copiar URL" />
            </div>
          )}
        </div>

        {/* Card 3 — Token */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Key className="w-5 h-5 text-secondary" /> Token de Integração
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            O token é armazenado de forma segura (hash SHA-256). O valor completo só é exibido uma vez, no momento da geração.
          </p>

          {loadingConfig ? (
            <div className="h-12 bg-muted animate-pulse rounded-xl" />
          ) : tokenExists ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
                <code className="flex-1 font-mono text-sm text-muted-foreground">{tokenPreview}</code>
                <Badge className="bg-green-100 text-green-800 border-green-200 shrink-0">Ativo</Badge>
              </div>
              <Button
                variant="outline"
                onClick={() => handleGenerate(true)}
                disabled={generatingToken}
                className="border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                {generatingToken ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Gerando...</> : <><RefreshCw className="w-4 h-4 mr-2" />Regenerar token</>}
              </Button>
              <p className="text-xs text-muted-foreground">
                Atenção: regenerar invalida o token anterior imediatamente.
              </p>
            </div>
          ) : (
            <Button
              onClick={() => handleGenerate(false)}
              disabled={generatingToken}
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              {generatingToken ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Gerando...</> : <><Key className="w-4 h-4 mr-2" />Gerar token de integração</>}
            </Button>
          )}

          {/* Token modal */}
          {modalToken && (
            <div className="mt-6 p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-800">Copie este token agora!</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Este é o único momento em que o token completo é exibido. Após fechar esta caixa, apenas um preview estará disponível.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-amber-200 rounded-xl p-4 font-mono text-sm break-all relative">
                {showFullToken ? modalToken : "•".repeat(48)}
                <button
                  onClick={() => setShowFullToken(v => !v)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showFullToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex gap-3">
                <CopyButton value={modalToken} label="Copiar token completo" />
                <button
                  onClick={() => setModalToken(null)}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Card 4 — Teste rápido */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Terminal className="w-5 h-5 text-secondary" /> Teste Rápido
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "health", path: "/api/health" },
              { label: "test",   path: "/api/test" },
              { label: "ping",   path: "/api/ping" },
            ].map(({ label, path }) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                onClick={() => runTest(label, path)}
                disabled={testingKey === label}
                className="font-mono text-xs"
              >
                {testingKey === label ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
                {path}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={testAuth}
              disabled={testingKey === "auth"}
              className="font-mono text-xs border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              {testingKey === "auth" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Shield className="w-3 h-3 mr-1" />}
              /validate
            </Button>
          </div>

          {/* Auth token input for validate test */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Token para testar autenticação (deixe em branco para usar o token gerado nesta sessão)</label>
            <input
              type="text"
              value={authToken}
              onChange={e => setAuthToken(e.target.value)}
              placeholder="vlf_site_..."
              className="w-full font-mono text-sm border border-border rounded-lg px-3 py-2 bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Test results */}
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-3">
              {Object.entries(testResults).map(([key, r]) => r && (
                <div key={key} className={`rounded-xl border p-4 ${r.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {r.ok ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                    <span className="font-mono text-sm font-bold">/api/{key}</span>
                    <span className={`text-xs font-semibold ${r.ok ? "text-green-700" : "text-red-700"}`}>
                      HTTP {r.data.status}
                    </span>
                  </div>
                  <pre className="text-xs bg-white/80 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(r.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {validateResult && (
            <div className={`rounded-xl border p-4 mt-3 ${validateResult.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                {validateResult.ok ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                <span className="font-mono text-sm font-bold">/api/integration/validate</span>
                <span className={`text-xs font-semibold ${validateResult.ok ? "text-green-700" : "text-red-700"}`}>
                  HTTP {validateResult.data.status}
                </span>
              </div>
              <pre className="text-xs bg-white/80 p-3 rounded-lg overflow-auto max-h-40">
                {JSON.stringify(validateResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Card 5 — Instruções para ERP */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Shield className="w-5 h-5 text-secondary" /> Configuração para o ERP
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Use estes valores na tela de integração do ERP. Clique em "Copiar" para copiar cada campo.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">URL da API do Site</p>
              <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
                <code className="flex-1 font-mono text-sm break-all">{baseUrl}</code>
                <CopyButton value={baseUrl} />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Token de API</p>
              {modalToken ? (
                <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
                  <code className="flex-1 font-mono text-sm break-all text-secondary">{modalToken}</code>
                  <CopyButton value={modalToken} label="Copiar token" />
                </div>
              ) : tokenExists ? (
                <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
                  <code className="flex-1 font-mono text-sm text-muted-foreground">{tokenPreview} (gere novamente para ver o token completo)</code>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                  <Info className="w-4 h-4 shrink-0" />
                  Gere o token no Card acima para ver o valor completo.
                </div>
              )}
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Endpoint de validação de conexão</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/30 border border-border rounded-xl p-4">
                  <p className="font-semibold mb-1">Público (sem autenticação)</p>
                  <code className="text-xs font-mono text-primary">GET {baseUrl}/health</code>
                </div>
                <div className="bg-muted/30 border border-border rounded-xl p-4">
                  <p className="font-semibold mb-1">Autenticado (Bearer token)</p>
                  <code className="text-xs font-mono text-secondary">POST {baseUrl}/integration/validate</code>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-green-400 rounded-xl p-5 font-mono text-xs space-y-1">
              <p className="text-slate-500 mb-2"># Exemplo de configuração ERP</p>
              <p>URL da API  = <span className="text-white">{baseUrl}</span></p>
              <p>Token       = <span className="text-yellow-300">{modalToken || tokenPreview || "vlf_site_..."}</span></p>
              <p>Validação   = <span className="text-white">POST {baseUrl}/integration/validate</span></p>
              <p>Header      = <span className="text-white">Authorization: Bearer {"<token>"}</span></p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
