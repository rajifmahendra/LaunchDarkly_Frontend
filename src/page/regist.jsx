import { useState } from "react";
import { useUser } from "../context/UserContext"; // Import Context

function Regist() {
  const { setUserId } = useUser(); // Ambil setter userId dari Context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    savings: 0, // Default sebagai number
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "savings" ? Number(value) : value, // Konversi ke number hanya untuk savings
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
          savings: Number(formData.savings), // Pastikan savings tetap number saat dikirim
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data)
      setUserId(data.ID);
      localStorage.setItem("userId", data.ID);
      alert("Registration successful! User ID: " + data.ID);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Savings:</label>
        <input type="number" name="savings" value={formData.savings} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Regist;
