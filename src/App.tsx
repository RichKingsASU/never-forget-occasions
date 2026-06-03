import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PaletteProvider } from "@/context/PaletteContext";
import { CartProvider } from "@/context/CartContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import { ContactDetail } from "./pages/ContactDetail";
import { OccasionNew } from "./pages/OccasionNew";
import { OccasionDetail } from "./pages/OccasionDetail";
import { GreetingComposer } from "./pages/GreetingComposer";
import { TemplateDetail } from "./pages/TemplateDetail";
import { CreatorDetail } from "./pages/CreatorDetail";
import { NotificationsPage } from "./pages/Notifications";
import { Terms, Privacy } from "./pages/Legal";
import { Auth } from "./pages/Auth";
import { Onboarding } from "./pages/Onboarding";
import { CommandPalette } from "./components/CommandPalette";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="popLayout">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/gifts" element={<GiftCatalog />} />
          <Route path="/gifts/:slug" element={<GiftDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts/:id" 
            element={
              <ProtectedRoute>
                <ContactDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/occasions/new" 
            element={
              <ProtectedRoute>
                <OccasionNew />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/occasions/:id" 
            element={
              <ProtectedRoute>
                <OccasionDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assistant" 
            element={
              <ProtectedRoute>
                <Assistant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/greetings/new" 
            element={
              <ProtectedRoute>
                <GreetingComposer />
              </ProtectedRoute>
            } 
          />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateDetail />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creators/:id" element={<CreatorDetail />} />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <PaletteProvider>
        <AuthProvider>
          <OrdersProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <CommandPalette />
                  <AnimatedRoutes />
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </OrdersProvider>
        </AuthProvider>
      </PaletteProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
