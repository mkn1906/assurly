import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation, Footer } from "@/components/navigation";
import { CookieConsent } from "@/components/cookie-consent";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const Home = lazy(() => import("@/pages/home"));
const Upload = lazy(() => import("@/pages/upload"));
const Analysis = lazy(() => import("@/pages/analysis"));
const Pricing = lazy(() => import("@/pages/pricing"));
const Checkout = lazy(() => import("@/pages/checkout"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const BrowserTest = lazy(() => import("@/pages/browser-test"));
const Terms = lazy(() => import("@/pages/terms"));
const GDPR = lazy(() => import("@/pages/gdpr"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Cookies = lazy(() => import("@/pages/cookies"));
const Disclaimer = lazy(() => import("@/pages/disclaimer"));
const Admin = lazy(() => import("@/pages/admin"));
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const DemoReport = lazy(() => import("@/pages/demo-report"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-trust-blue border-t-transparent rounded-full" aria-label="Indlæser siden..."/>
  </div>
);

function Router() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/upload" component={Upload} />
            <Route path="/analysis/:id" component={Analysis} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/browser-test" component={BrowserTest} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/gdpr" component={GDPR} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/admin" component={Admin} />
            <Route path="/admin/knudsen" component={AdminLogin} />
            <Route path="/demo-report" component={DemoReport} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <I18nProvider>
            <Toaster />
            <Router />
          </I18nProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
