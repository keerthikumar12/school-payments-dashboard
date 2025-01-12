import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(""); // Filter status (Success, Pending, Failed)
  const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Filter by date range
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // To catch API errors

  useEffect(() => {
    fetchTransactions();
  }, [status, dateRange]); // Dependencies: status and dateRange will trigger this effect when changed

  const fetchTransactions = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors

    try {
      const response = await axios.get("/transactions", {
        params: { 
          status, 
          startDate: dateRange.start, 
          endDate: dateRange.end 
        },
      });

      setTransactions(response.data); // Set data if request is successful
    } catch (error) {
      setError("Failed to load transactions. Please try again later."); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Transactions Overview</h2>
      
      {/* Filters */}
      <div>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          value={dateRange.start}
        />
        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          value={dateRange.end}
        />
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Transaction Table */}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Collect ID</th>
              <th>School ID</th>
              <th>Gateway</th>
              <th>Order Amount</th>
              <th>Transaction Amount</th>
              <th>Status</th>
              <th>Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.collect_id}>
                <td>{txn.collect_id}</td>
                <td>{txn.school_id}</td>
                <td>{txn.gateway}</td>
                <td>{txn.order_amount}</td>
                <td>{txn.transaction_amount}</td>
                <td>{txn.status}</td>
                <td>{txn.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
