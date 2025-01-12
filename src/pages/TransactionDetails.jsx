import { useState, useEffect } from "react";
import axios from "axios";

const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state to handle API errors

  // Function to fetch transactions for a given schoolId
  const fetchTransactions = async (schoolId) => {
    setLoading(true);
    setError(null); // Reset error before each request
    try {
      const response = await axios.get(`/transactions/${schoolId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to load transactions. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for schoolId
  const handleSchoolIdChange = (e) => {
    setSchoolId(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (schoolId.trim() === "") {
      alert("Please enter a valid School ID");
    } else {
      fetchTransactions(schoolId);
    }
  };

  // Clear the input and reset transactions
  const handleClear = () => {
    setSchoolId("");
    setTransactions([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details by School</h2>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={schoolId}
          onChange={handleSchoolIdChange}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Enter School ID"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Clear
        </button>
      </div>

      {/* Show loading or error state */}
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Show transaction table if data is available */}
      {!loading && !error && transactions.length > 0 && (
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr>
              <th className="border-b p-2">Collect ID</th>
              <th className="border-b p-2">School ID</th>
              <th className="border-b p-2">Gateway</th>
              <th className="border-b p-2">Order Amount</th>
              <th className="border-b p-2">Transaction Amount</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.collect_id} className="border-t">
                <td className="p-2">{txn.collect_id}</td>
                <td className="p-2">{txn.school_id}</td>
                <td className="p-2">{txn.gateway}</td>
                <td className="p-2">{txn.order_amount}</td>
                <td className="p-2">{txn.transaction_amount}</td>
                <td className="p-2">{txn.status}</td>
                <td className="p-2">{txn.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show message if no transactions are found */}
      {!loading && !error && transactions.length === 0 && (
        <div className="text-center text-gray-500 mt-4">No transactions found.</div>
      )}
    </div>
  );
};

export default TransactionDetails;
