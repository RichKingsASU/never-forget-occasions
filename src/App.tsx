import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { OrdersProvider } from "@/context/OrdersContext";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import { GiftCatalog } from "./pages/GiftCatalog";
import { GiftDetail } from "./pages/GiftDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { OrderDetail } from "./pages/OrderDetail";
import { Contacts } from "./pages/Contacts";
import { Calendar } from "./pages/Calendar";
import { Assistant } from "./pages/Assistant";
import { Templates } from "./pages/Templates";
import { Creators } from "./pages/Creators";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <OrdersProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gifts" element={<GiftCatalog />} />
                <Route path="/gifts/:slug" element={<GiftDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/creators" element={<Creators />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </OrdersProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
