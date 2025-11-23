import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GradientDefs from "./components/GradientDefs";
import AnimatedRoute from "./components/AnimatedRoute";
import Home from "./pages/Home";
import Museum from "./pages/Museum";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GradientDefs />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
          <Route path="/museum/:id" element={<AnimatedRoute><Museum /></AnimatedRoute>} />
          <Route path="/museums" element={<AnimatedRoute><Explore /></AnimatedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
