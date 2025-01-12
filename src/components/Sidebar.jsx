import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/transaction-details">Transaction Details</Link></li>
      <li><Link to="/transaction-status">Check Status</Link></li>
    </ul>
  </div>
);
export default Sidebar;
