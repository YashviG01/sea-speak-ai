import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Chat from "./pages/Chat";
import Visualize from "./pages/Visualize";
import DataExplorer from "./pages/DataExplorer";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          
          {/* Main Application Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/explore" element={<DataExplorer />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
