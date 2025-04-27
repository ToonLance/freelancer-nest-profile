
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SetupUsername from "./pages/SetupUsername";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { AuthProviderWithNavigation } from "./components/AuthProviderWithNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProviderWithNavigation>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setup-username" element={<SetupUsername />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProviderWithNavigation>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
