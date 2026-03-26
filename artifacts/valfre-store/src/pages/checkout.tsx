import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/cart-context";
import { useCreateCheckout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck, CreditCard, Lock, CheckCircle2,
  FileText, QrCode, Tag, Loader2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import * as erpApi from "@/services/erpApi";

const PICKUP_OPTION = {
  id: "pickup",
  name: "Retirada Grátis na Loja (Cariacica — ES)",
  price: 0,
  days: 0,
  carrier: "Valfre",
};

function CheckoutHeader() {
  return (
    <header className="w-full bg-white border-b border-border py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="font-display font-black text-xl text-primary tracking-tight">
          FERRAMENTAS<span className="text-secondary"> VALFRE</span>
        </a>
        <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200">
          <ShieldCheck className="w-4 h-4" /> Checkout 100% Seguro
        </div>
      </div>
    </header>
  );
}

const checkoutSchema = z.object({
  name:          z.string().min(3, "Nome completo obrigatório"),
  email:         z.string().email("E-mail inválido"),
  document:      z.string().min(11, "CPF/CNPJ inválido"),
  phone:         z.string().min(10, "Telefone inválido"),
  cep:           z.string().min(8, "CEP inválido"),
  street:        z.string().min(3, "Endereço obrigatório"),
  number:        z.string().min(1, "Número obrigatório"),
  complement:    z.string().optional(),
  neighborhood:  z.string().min(2, "Bairro obrigatório"),
  city:          z.string().min(2, "Cidade obrigatória"),
  state:         z.string().min(2, "Estado obrigatório"),
  paymentMethod: z.enum(["credit_card", "pix", "boleto"]),
  installments:  z.coerce.number().optional(),
  shippingOption: z.string().min(1, "Selecione o frete"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, sessionId } = useCart();
  const [, setLocation] = useLocation();

  const [shippingOptions, setShippingOptions] = useState<erpApi.ErpShippingOption[]>([PICKUP_OPTION]);
  const [cepLoading, setCepLoading] = useState(false);

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponResult, setCouponResult] = useState<erpApi.ErpCouponResult | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const createMutation = useCreateCheckout();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "credit_card", installments: 1 },
  });

  const paymentMethod   = form.watch("paymentMethod");
  const selectedId      = form.watch("shippingOption");
  const selectedShipping = shippingOptions.find(o => o.id === selectedId);

  const subtotal = cart?.total || 0;
  const shippingPrice = selectedShipping?.price ?? 0;

  const discountAmount = (() => {
    if (!couponResult?.valid) return 0;
    if (couponResult.discount_type === "percentage") return subtotal * (couponResult.discount / 100);
    return couponResult.discount;
  })();

  const orderTotal = Math.max(0, subtotal + shippingPrice - discountAmount);

  // ---------- CEP auto-fill ----------
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    try {
      const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await viaCep.json();
      if (!data.erro) {
        form.setValue("street",       data.logradouro);
        form.setValue("neighborhood", data.bairro);
        form.setValue("city",         data.localidade);
        form.setValue("state",        data.uf);
      }

      const cartItems: erpApi.ErpShippingProduct[] = (cart?.items || []).map(item => ({
        sku:             (item as any).sku || item.productId,
        name:            item.name,
        width:           (item as any).width  ?? 20,
        height:          (item as any).height ?? 10,
        length:          (item as any).length ?? 25,
        weight:          (item as any).weight ?? 0.5,
        insurance_value: item.price,
        quantity:        item.quantity,
      }));

      const { options } = await erpApi.calculateShipping(cep, cartItems);
      setShippingOptions(options);
      if (options.length > 0) form.setValue("shippingOption", options[0].id);
    } catch {
      setShippingOptions([PICKUP_OPTION]);
    } finally {
      setCepLoading(false);
    }
  };

  // ---------- Coupon ----------
  const handleApplyCoupon = async () => {
    const code = couponInput.trim();
    if (!code) return;
    setCouponLoading(true);
    try {
      const items = (cart?.items || []).map(i => ({
        sku: (i as any).sku || i.productId,
        quantity: i.quantity,
        price: i.price,
      }));
      const result = await erpApi.validateCoupon(code, subtotal, items);
      setCouponResult(result);
      if (result.valid) toast.success(result.message || "Cupom aplicado!");
      else toast.error(result.message || "Cupom inválido.");
    } catch {
      toast.error("Erro ao validar cupom.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => { setCouponResult(null); setCouponInput(""); };

  // ---------- Submit ----------
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!cart) return;
    if (!selectedShipping) { toast.error("Selecione uma opção de frete."); return; }

    setSubmitting(true);
    try {
      const orderPayload: erpApi.ErpOrderPayload = {
        customer: {
          name:      values.name,
          email:     values.email,
          cpf_cnpj:  values.document,
          phone:     values.phone,
        },
        address: {
          cep:          values.cep.replace(/\D/g, ""),
          street:       values.street,
          number:       values.number,
          complement:   values.complement,
          neighborhood: values.neighborhood,
          city:         values.city,
          state:        values.state,
        },
        items: cart.items.map(item => ({
          sku:      (item as any).sku || item.productId,
          name:     item.name,
          price:    item.price,
          quantity: item.quantity,
        })),
        shipping: {
          method:     selectedShipping.name,
          service_id: selectedShipping.service_id,
          price:      selectedShipping.price,
        },
        payment: {
          method: values.paymentMethod,
          status: "pending",
        },
        coupon_code: couponResult?.valid ? couponResult.code : undefined,
        discount:    discountAmount > 0 ? discountAmount : undefined,
        source: "website",
      };

      let erpOrderRef: string | undefined;
      try {
        const erpResult = await erpApi.createErpOrder(orderPayload);
        erpOrderRef = erpResult.external_reference;
      } catch {
        console.warn("[ERP] createOrder failed — proceeding with local checkout");
      }

      try {
        const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");
        await fetch(`${apiBase}/api/integracoes/site/pedido`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-token": import.meta.env.VITE_SITE_API_TOKEN || "",
          },
          body: JSON.stringify({ ...orderPayload, erp_reference: erpOrderRef }),
        });
      } catch {
        console.warn("[integracoes/site] Falha ao notificar integração — continuando");
      }

      const res = await createMutation.mutateAsync({
        data: {
          sessionId,
          customer: {
            name: values.name, email: values.email,
            phone: values.phone, document: values.document,
            address: {
              cep: values.cep, street: values.street, number: values.number,
              complement: values.complement, neighborhood: values.neighborhood,
              city: values.city, state: values.state,
            },
          },
          payment: {
            method: values.paymentMethod,
            installments: values.installments,
            cardToken: values.paymentMethod === "credit_card" ? "mock_token" : undefined,
          },
          shipping: {
            optionId: selectedShipping.id,
            price:    selectedShipping.price,
            days:     selectedShipping.days,
          },
        },
      });

      toast.success("Pedido realizado com sucesso!");
      setLocation(`/pedido/${res.orderId}`);
    } catch {
      toast.error("Erro ao processar o pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    setLocation("/carrinho");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <CheckoutHeader />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-12 gap-8">

            {/* ── Left column ── */}
            <div className="md:col-span-7 space-y-6">

              {/* Step 1 — Personal data */}
              <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                  Dados Pessoais
                </h2>
                <div className="space-y-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <Label>E-mail *</Label>
                      <FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <Label>Nome Completo *</Label>
                      <FormControl><Input placeholder="João da Silva" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="document" render={({ field }) => (
                      <FormItem>
                        <Label>CPF / CNPJ *</Label>
                        <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <Label>Celular / WhatsApp *</Label>
                        <FormControl><Input placeholder="(27) 99999-9999" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>
              </section>

              {/* Step 2 — Address */}
              <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                  Endereço de Entrega
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="cep" render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Label>CEP *</Label>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="00000-000"
                              {...field}
                              onBlur={e => { field.onBlur(); handleCepBlur(e); }}
                            />
                          </FormControl>
                          {cepLoading && <Loader2 className="absolute right-3 top-3 w-4 h-4 animate-spin text-muted-foreground" />}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="street" render={({ field }) => (
                      <FormItem className="col-span-2">
                        <Label>Endereço *</Label>
                        <FormControl><Input placeholder="Rua / Av." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="number" render={({ field }) => (
                      <FormItem>
                        <Label>Número *</Label>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="complement" render={({ field }) => (
                      <FormItem>
                        <Label>Complemento</Label>
                        <FormControl><Input placeholder="Apto, Sala..." {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="neighborhood" render={({ field }) => (
                      <FormItem>
                        <Label>Bairro *</Label>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <Label>Cidade *</Label>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem>
                        <Label>Estado *</Label>
                        <FormControl><Input maxLength={2} placeholder="ES" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>
              </section>

              {/* Step 3 — Shipping options */}
              <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                  Opções de Frete
                </h2>
                <FormField control={form.control} name="shippingOption" render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                    {shippingOptions.map(opt => (
                      <div
                        key={opt.id}
                        className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all ${field.value === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40"}`}
                        onClick={() => field.onChange(opt.id)}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={opt.id} id={opt.id} />
                          <div>
                            <Label htmlFor={opt.id} className="cursor-pointer font-bold text-sm">{opt.name}</Label>
                            {opt.carrier && opt.carrier !== "Valfre" && (
                              <p className="text-xs text-muted-foreground">{opt.carrier}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${opt.price === 0 ? "text-green-600" : "text-foreground"}`}>
                            {opt.price === 0 ? "Grátis" : formatCurrency(opt.price)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {opt.days === 0 ? "Retirada imediata" : `Até ${opt.days} dia${opt.days > 1 ? "s" : ""} útil${opt.days > 1 ? "is" : ""}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )} />
                {cepLoading && (
                  <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Calculando fretes para seu CEP...
                  </p>
                )}
              </section>

              {/* Step 4 — Payment */}
              <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
                  Forma de Pagamento
                </h2>

                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { value: "credit_card", icon: CreditCard, label: "Cartão" },
                      { value: "pix",         icon: QrCode,     label: "PIX" },
                      { value: "boleto",      icon: FileText,   label: "Boleto" },
                    ].map(({ value, icon: Icon, label }) => (
                      <Label
                        key={value}
                        className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-all ${field.value === value ? "border-secondary bg-secondary/5" : "border-border"}`}
                      >
                        <RadioGroupItem value={value} className="sr-only" />
                        <Icon className={`w-8 h-8 mb-2 ${field.value === value ? "text-secondary" : "text-muted-foreground"}`} />
                        <span className="font-bold text-sm">{label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )} />

                {paymentMethod === "credit_card" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden h-44 w-full max-w-sm mx-auto shadow-xl">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
                      <CreditCard className="w-7 h-7 mb-5 text-white/50" />
                      <div className="text-lg font-mono tracking-widest mb-4">**** **** **** ****</div>
                      <div className="flex justify-between font-mono text-sm opacity-70">
                        <span>NOME IMPRESSO</span>
                        <span>MM/AA</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormItem className="md:col-span-2">
                        <Label>Número do Cartão</Label>
                        <Input placeholder="0000 0000 0000 0000" />
                      </FormItem>
                      <FormItem className="md:col-span-2">
                        <Label>Nome no Cartão</Label>
                        <Input placeholder="Como impresso no cartão" />
                      </FormItem>
                      <FormItem>
                        <Label>Validade</Label>
                        <Input placeholder="MM/AA" />
                      </FormItem>
                      <FormItem>
                        <Label>CVV</Label>
                        <Input type="password" placeholder="123" maxLength={4} />
                      </FormItem>
                    </div>
                    <FormField control={form.control} name="installments" render={({ field }) => (
                      <FormItem className="mt-4">
                        <Label>Parcelamento</Label>
                        <Select onValueChange={v => field.onChange(parseInt(v))} defaultValue={field.value?.toString()}>
                          <SelectTrigger><SelectValue placeholder="Selecione as parcelas" /></SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 6, 10, 12].map(n => (
                              <SelectItem key={n} value={String(n)}>
                                {n}x de {formatCurrency(orderTotal / n)}{n <= 3 ? " sem juros" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-xl flex items-center gap-4 animate-in fade-in">
                    <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
                    <div>
                      <p className="font-bold">PIX selecionado — 5% de desconto!</p>
                      <p className="text-sm mt-1">O QR Code será gerado após a confirmação. Aprovação imediata.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="bg-muted p-5 rounded-xl flex items-center gap-4 animate-in fade-in">
                    <FileText className="w-8 h-8 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-bold">Boleto Bancário</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        O boleto é gerado após finalizar o pedido. Compensação em até 3 dias úteis.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* ── Right column: order summary ── */}
            <div className="md:col-span-5">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-xl sticky top-8 space-y-6">
                <h3 className="font-display text-xl font-bold">Resumo do Pedido</h3>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-auto pr-1">
                  {cart.items.map(item => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-14 h-14 bg-muted rounded-lg border border-border shrink-0 p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-semibold line-clamp-2 leading-tight mb-1">{item.name}</p>
                        <p className="text-muted-foreground text-xs">Qtd: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Coupon */}
                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <Tag className="w-4 h-4 text-secondary" /> Cupom de Desconto
                  </p>
                  {couponResult?.valid ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-2 text-sm">
                      <span className="font-mono font-bold">{couponResult.code}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">-{formatCurrency(discountAmount)}</span>
                        <button type="button" onClick={removeCoupon} className="text-green-600 hover:text-red-600 text-xs underline ml-1">Remover</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Código do cupom"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 h-10 text-sm font-mono"
                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleApplyCoupon())}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-10 px-4 border-secondary text-secondary hover:bg-secondary hover:text-white"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponInput.trim()}
                      >
                        {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aplicar"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>
                      {selectedShipping
                        ? selectedShipping.price === 0 ? <span className="text-green-600 font-semibold">Grátis</span> : formatCurrency(selectedShipping.price)
                        : "—"}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Desconto ({couponResult?.code})</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary text-2xl">{formatCurrency(orderTotal)}</span>
                  </div>
                  {paymentMethod === "pix" && (
                    <p className="text-xs text-green-700 text-right">✓ 5% de desconto no PIX já aplicado</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting || !selectedShipping}
                  className="w-full h-14 text-base font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30"
                >
                  {submitting
                    ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando...</>
                    : <><Lock className="w-5 h-5 mr-2" /> Finalizar Pedido</>
                  }
                </Button>

                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                  Ao finalizar, você concorda com os{" "}
                  <a href="/termos" className="underline text-primary">Termos de Serviço</a> e a{" "}
                  <a href="/politica-privacidade" className="underline text-primary">Política de Privacidade</a>.
                </p>

                <div className="flex items-center justify-center gap-3 text-muted-foreground text-xs pt-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Dados protegidos com criptografia SSL</span>
                </div>
              </div>
            </div>

          </form>
        </Form>
      </main>
    </div>
  );
}
