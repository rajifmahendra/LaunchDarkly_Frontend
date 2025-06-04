import { useState } from "react";
import { useUser } from "../context/usercontext";

function Transfer() {
  const { user } = useUser(); // Ambil userId dari Context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleTransfer = async () => {
    setLoading(true);
    setError(null);
    setSuccess("");
    setResponseData(null);

    const currentUserId = user.ID || localStorage.getItem("userId");
    if (!currentUserId) {
      setError("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://7eca-202-65-229-116.ngrok-free.app/transfer/${currentUserId}`, {
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
    <div style={{
      maxWidth: "400px",
      margin: "40px auto",
      padding: "24px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#374151", marginBottom: "16px" }}>Transfer</h2>
    
      {error && <p style={{
        backgroundColor: "#FEE2E2", color: "#B91C1C",
        padding: "8px", borderRadius: "6px", textAlign: "center"
      }}>{error}</p>}
    
      {success && <p style={{
        backgroundColor: "#D1FAE5", color: "#065F46",
        padding: "8px", borderRadius: "6px", textAlign: "center"
      }}>{success}</p>}
    
      {responseData && (
        <pre style={{
          backgroundColor: "#F3F4F6", padding: "10px",
          borderRadius: "6px", overflowX: "auto",
          textAlign: "left", maxHeight: "200px"
        }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    
      <button
        onClick={handleTransfer}
        disabled={loading}
        style={{
          width: "100%", padding: "12px", borderRadius: "6px", border: "none",
          backgroundColor: loading ? "#9CA3AF" : "#2563EB", color: "white",
          fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => { if (!loading) e.target.style.backgroundColor = "#1D4ED8"; }}
        onMouseOut={(e) => { if (!loading) e.target.style.backgroundColor = "#2563EB"; }}
      >
        {loading ? "Processing..." : "Send 50"}
      </button>
    </div>
    
  );
}

export default Transfer;
