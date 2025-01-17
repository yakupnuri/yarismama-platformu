import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Competition from "./pages/Competition";
import PrizesEdit from "./pages/PrizesEdit";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/prizes-edit" element={<PrizesEdit />} />
      </Routes>
    </Router>
  );
}

export default App;