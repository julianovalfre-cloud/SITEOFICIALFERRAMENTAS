import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/cart-context";
import { useCreateCheckout, useCalculateShipping } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, Lock, CheckCircle2, ChevronRight, FileText, QrCode } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Minimal header for checkout (no distractions)
function CheckoutHeader() {
  return (
    <header className="w-full bg-white border-b border-border py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Valfre" className="h-10 object-contain filter invert" />
        <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200">
          <ShieldCheck className="w-4 h-4" /> Checkout Seguro
        </div>
      </div>
    </header>
  );
}

const checkoutSchema = z.object({
  name: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  document: z.string().min(11, "CPF inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cep: z.string().min(8, "CEP inválido"),
  street: z.string().min(3, "Endereço obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  paymentMethod: z.enum(["credit_card", "pix", "boleto"]),
  installments: z.coerce.number().optional(),
  shippingOption: z.string().min(1, "Selecione o frete")
});

export default function CheckoutPage() {
  const { cart, sessionId } = useCart();
  const [, setLocation] = useLocation();
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  
  const createMutation = useCreateCheckout();
  const shippingMutation = useCalculateShipping();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit_card",
      installments: 1
    },
  });

  const paymentMethod = form.watch("paymentMethod");
  const selectedShippingId = form.watch("shippingOption");
  
  const selectedShipping = shippingOptions.find(o => o.id === selectedShippingId);
  const orderTotal = (cart?.total || 0) + (selectedShipping?.price || 0);

  // Auto-fill address via viaCEP
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          form.setValue("street", data.logradouro);
          form.setValue("neighborhood", data.bairro);
          form.setValue("city", data.localidade);
          form.setValue("state", data.uf);
          
          // Also fetch shipping options
          const shipRes = await shippingMutation.mutateAsync({ data: { cep, sessionId } });
          setShippingOptions(shipRes.options);
          if (shipRes.options.length > 0) {
            form.setValue("shippingOption", shipRes.options[0].id);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    if (!cart) return;

    try {
      const res = await createMutation.mutateAsync({
        data: {
          sessionId,
          customer: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            document: values.document,
            address: {
              cep: values.cep,
              street: values.street,
              number: values.number,
              complement: values.complement,
              neighborhood: values.neighborhood,
              city: values.city,
              state: values.state
            }
          },
          payment: {
            method: values.paymentMethod,
            installments: values.installments,
            cardToken: values.paymentMethod === 'credit_card' ? "mock_token" : undefined
          },
          shipping: {
            optionId: selectedShipping!.id,
            price: selectedShipping!.price,
            days: selectedShipping!.days
          }
        }
      });

      toast.success("Pedido criado com sucesso!");
      setLocation(`/pedido/${res.orderId}`);

    } catch (err) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
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
            
            {/* Left Column: Forms */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Step 1: Personal Data */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</div>
                  Dados Pessoais
                </h2>
                <div className="space-y-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><Label>E-mail</Label><FormControl><Input placeholder="seu@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><Label>Nome Completo</Label><FormControl><Input placeholder="João da Silva" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="document" render={({ field }) => (
                      <FormItem><Label>CPF/CNPJ</Label><FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><Label>Celular (WhatsApp)</Label><FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</div>
                  Entrega
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="cep" render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Label>CEP</Label>
                        <FormControl><Input placeholder="00000-000" {...field} onBlur={(e) => { field.onBlur(); handleCepBlur(e); }} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="street" render={({ field }) => (
                      <FormItem className="col-span-2"><Label>Endereço</Label><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="number" render={({ field }) => (
                      <FormItem><Label>Número</Label><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="complement" render={({ field }) => (
                      <FormItem><Label>Complemento</Label><FormControl><Input placeholder="Apto, Sala..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="neighborhood" render={({ field }) => (
                      <FormItem><Label>Bairro</Label><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><Label>Cidade</Label><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem><Label>Estado</Label><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  {shippingOptions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="mb-4 block">Opções de Frete</Label>
                      <FormField control={form.control} name="shippingOption" render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                          {shippingOptions.map(opt => (
                            <div key={opt.id} className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors ${field.value === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={opt.id} id={opt.id} />
                                <Label htmlFor={opt.id} className="cursor-pointer font-bold">{opt.name}</Label>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary">{opt.price === 0 ? 'Grátis' : formatCurrency(opt.price)}</div>
                                <div className="text-xs text-muted-foreground">Em até {opt.days} dias úteis</div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      )} />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</div>
                  Pagamento
                </h2>
                
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-3 gap-4 mb-6">
                    <Label className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-all ${field.value === 'credit_card' ? 'border-secondary bg-secondary/5' : 'border-border'}`}>
                      <RadioGroupItem value="credit_card" className="sr-only" />
                      <CreditCard className={`w-8 h-8 mb-2 ${field.value === 'credit_card' ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm">Cartão</span>
                    </Label>
                    <Label className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-all ${field.value === 'pix' ? 'border-secondary bg-secondary/5' : 'border-border'}`}>
                      <RadioGroupItem value="pix" className="sr-only" />
                      <QrCode className={`w-8 h-8 mb-2 ${field.value === 'pix' ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm">PIX</span>
                    </Label>
                    <Label className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-all ${field.value === 'boleto' ? 'border-secondary bg-secondary/5' : 'border-border'}`}>
                      <RadioGroupItem value="boleto" className="sr-only" />
                      <FileText className={`w-8 h-8 mb-2 ${field.value === 'boleto' ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <span className="font-bold text-sm">Boleto</span>
                    </Label>
                  </RadioGroup>
                )} />

                {/* Dynamic Payment Forms based on selection */}
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden mb-6 h-48 w-full max-w-sm mx-auto shadow-xl">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                       <CreditCard className="w-8 h-8 mb-6 text-white/50" />
                       <div className="text-xl font-mono tracking-widest mb-4">**** **** **** 1234</div>
                       <div className="flex justify-between font-mono text-sm opacity-80">
                         <span>NOME IMPRESSO</span>
                         <span>12/29</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem className="md:col-span-2"><Label>Número do Cartão</Label><Input placeholder="0000 0000 0000 0000" /></FormItem>
                      <FormItem className="md:col-span-2"><Label>Nome no Cartão</Label><Input placeholder="Nome como impresso" /></FormItem>
                      <FormItem><Label>Validade (MM/AA)</Label><Input placeholder="12/29" /></FormItem>
                      <FormItem><Label>CVV</Label><Input placeholder="123" type="password" maxLength={4} /></FormItem>
                    </div>
                    <FormField control={form.control} name="installments" render={({ field }) => (
                      <FormItem className="mt-4">
                        <Label>Parcelamento</Label>
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                          <SelectTrigger><SelectValue placeholder="Selecione as parcelas" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1x de {formatCurrency(orderTotal)} sem juros</SelectItem>
                            <SelectItem value="2">2x de {formatCurrency(orderTotal/2)} sem juros</SelectItem>
                            <SelectItem value="3">3x de {formatCurrency(orderTotal/3)} sem juros</SelectItem>
                            <SelectItem value="10">10x de {formatCurrency(orderTotal/10)} sem juros</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex items-center gap-4 animate-in fade-in">
                    <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Pagamento com PIX selecionado</h4>
                      <p className="text-sm">O QR Code será gerado na próxima tela após a finalização do pedido. Aprovação imediata!</p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'boleto' && (
                  <div className="bg-muted p-6 rounded-xl flex items-center gap-4 animate-in fade-in">
                    <FileText className="w-8 h-8 text-muted-foreground shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Pagamento com Boleto</h4>
                      <p className="text-sm text-muted-foreground">O boleto será gerado ao finalizar o pedido. O pagamento pode levar até 3 dias úteis para ser compensado.</p>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="md:col-span-5">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-xl sticky top-8">
                <h3 className="font-display text-xl font-bold mb-6">Resumo do Pedido</h3>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-auto pr-2">
                  {cart.items.map(item => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg border border-border shrink-0 p-1">
                         <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-bold line-clamp-2 leading-tight mb-1">{item.name}</p>
                        <p className="text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                      <div className="font-bold">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-border text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>{selectedShipping ? formatCurrency(selectedShipping.price) : 'Calculando...'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                    <span>Total a pagar</span>
                    <span className="text-primary text-2xl">{formatCurrency(orderTotal)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || !selectedShipping}
                  className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30"
                >
                  {createMutation.isPending ? "Processando..." : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Finalizar Pedido
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao finalizar, você concorda com nossos Termos de Serviço e Políticas de Privacidade.
                </p>
              </div>
            </div>

          </form>
        </Form>
      </main>
    </div>
  );
}
