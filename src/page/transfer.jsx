import { useState } from "react";
import { useUser } from "../context/usercontext";

function Transfer() {
  const { userId } = useUser(); // Ambil userId dari Context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleTransfer = async () => {
    setLoading(true);
    setError(null);
    setSuccess("");
    setResponseData(null);

    const currentUserId = userId || localStorage.getItem("userId");
    if (!currentUserId) {
      setError("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/transfer/${currentUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 50 }),
      });

      const data = await response.json(); // Ambil response body

      if (!response.ok) {
        throw new Error(data?.message || "Transfer failed");
      }

      setSuccess("Transfer successful!");
      setResponseData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Transfer</h2>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      {success && <p className="success" style={{ color: "green" }}>{success}</p>}
      {responseData && (
        <pre className="response-box" style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}

      <button onClick={handleTransfer} disabled={loading}>
        {loading ? "Processing..." : "Send 50"}
      </button>
    </div>
  );
}

export default Transfer;
