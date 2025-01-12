import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TransactionDetails from "./pages/TransactionDetails";
import TransactionStatus from "./pages/TransactionStatus";

const App = () => (
  <Router>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction-details" element={<TransactionDetails />} />
          <Route path="/transaction-status" element={<TransactionStatus />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
