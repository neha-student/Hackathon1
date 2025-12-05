import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserTypeSelection from "./pages/UserTypeSelection";
import HROnboarding from "./pages/HROnboarding";
import HRDashboard from "./pages/HRDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import TestSchedule from "./pages/TestSchedule";
import TakeTest from "./pages/TakeTest";
import Shortlisted from "./pages/Shortlisted";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/select-type" element={<UserTypeSelection />} />
          <Route path="/hr-onboarding" element={<HROnboarding />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/candidate-profile" element={<CandidateProfile />} />
          <Route path="/test-schedule" element={<TestSchedule />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/shortlisted" element={<Shortlisted />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
