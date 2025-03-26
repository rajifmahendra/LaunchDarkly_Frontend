import { useState } from "react";
import { useUser } from "../context/usercontext";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

function Regist() {
  const userContext = useUser();
  const { setUser } = useUser();
  const navigate = useNavigate(); // ✅ Gunakan useNavigate untuk redirect
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country:"",
    savings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "savings" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          savings: Number(formData.savings),
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data);
      setUser(data);
      localStorage.setItem("userId", data.ID);
      alert("Registration successful! User ID: " + data.ID);

      navigate("/"); // ✅ Redirect ke halaman utama setelah sukses
    } catch (err) {
      setError(err.message);
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
      borderRadius: "8px" 
    }}>
      <h2 style={{ textAlign: "center", color: "#374151", marginBottom: "16px" }}>Register</h2>
    
      {error && <p style={{ backgroundColor: "#FEE2E2", color: "#B91C1C", padding: "8px", borderRadius: "6px", textAlign: "center" }}>{error}</p>}
    
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", color: "#374151" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%", padding: "10px", marginTop: "6px", border: "1px solid #ccc", borderRadius: "6px",
              outline: "none", transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #2563EB"}
            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
          />
        </div>
    
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", color: "#374151" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%", padding: "10px", marginTop: "6px", border: "1px solid #ccc", borderRadius: "6px",
              outline: "none", transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #2563EB"}
            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
          />
        </div>
    
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", color: "#374151" }}>Savings:</label>
          <input
            type="number"
            name="savings"
            value={formData.savings}
            onChange={handleChange}
            required
            style={{
              width: "100%", padding: "10px", marginTop: "6px", border: "1px solid #ccc", borderRadius: "6px",
              outline: "none", transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #2563EB"}
            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
          />
        </div>
    
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: "bold", color: "#374151" }}>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={{
              width: "100%", padding: "10px", marginTop: "6px", border: "1px solid #ccc", borderRadius: "6px",
              outline: "none", transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #2563EB"}
            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
          />
        </div>
    
        <button
          type="submit"
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
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
    
  );
}

export default Regist;
