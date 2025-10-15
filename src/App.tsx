import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapView from "./pages/MapView";
import Forecast from "./pages/Forecast";
import Report from "./pages/Report";
import AIAssistant from "./pages/AIAssistant";
import Citizen from "./pages/Citizen";
import Admin from "./pages/Admin";
import PolicyMaker from "./pages/PolicyMaker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/report" element={<Report />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/policy-maker" element={<PolicyMaker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
