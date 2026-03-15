import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import { WhatsAppButton } from "@/components/whatsapp-button";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Category from "@/pages/category";
import Product from "@/pages/product";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import OrderPage from "@/pages/order";
import LoginPage from "@/pages/login";
import MinhaContaPage from "@/pages/minha-conta";
import AjudaPage from "@/pages/ajuda";
import PoliticaPrivacidade from "@/pages/politica-privacidade";
import PoliticaDevolucao from "@/pages/politica-devolucao";
import Garantia from "@/pages/garantia";
import PoliticaEntrega from "@/pages/politica-entrega";
import Termos from "@/pages/termos";
import RastreioPage from "@/pages/rastreio";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categoria/:slug" component={Category} />
      <Route path="/categoria/:slug/:sub" component={Category} />
      <Route path="/produto/:id" component={Product} />
      <Route path="/carrinho" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/pedido/:id" component={OrderPage} />
      <Route path="/rastreio/:id" component={RastreioPage} />
      <Route path="/rastreio" component={RastreioPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/cadastro" component={LoginPage} />
      <Route path="/minha-conta" component={MinhaContaPage} />
      <Route path="/ajuda" component={AjudaPage} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/politica-devolucao" component={PoliticaDevolucao} />
      <Route path="/garantia" component={Garantia} />
      <Route path="/politica-entrega" component={PoliticaEntrega} />
      <Route path="/termos" component={Termos} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <WhatsAppButton />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
