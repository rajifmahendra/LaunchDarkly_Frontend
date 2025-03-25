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
