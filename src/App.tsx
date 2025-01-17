import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import Competition from "./pages/Competition";
import PrizesEdit from "./pages/PrizesEdit";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/prizes-edit" element={<PrizesEdit />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;