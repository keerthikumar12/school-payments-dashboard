import { useState } from "react";
import axios from "axios";

const TransactionStatus = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCustomOrderIdChange = (e) => {
    setCustomOrderId(e.target.value);
  };

  const checkTransactionStatus = async () => {
    if (!customOrderId) {
      setError("Please enter a custom order ID.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/check-status/${customOrderId}`);
      setStatus(response.data.status);  // Assuming the API returns the status of the transaction
    } catch (error) {
      setError("Error fetching status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Transaction Status Check</h2>
      <div className="mb-4">
        <input
          type="text"
          value={customOrderId}
          onChange={handleCustomOrderIdChange}
          className="p-2 border border-gray-300"
          placeholder="Enter Custom Order ID"
        />
        <button
          onClick={checkTransactionStatus}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Check Status
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {error && <div className="text-red-500">{error}</div>}

      {status && (
        <div>
          <h3>Transaction Status:</h3>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;
