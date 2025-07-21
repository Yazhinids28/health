import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css"; // Import the register CSS file here

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!form.username || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Send data to backend for registration
    const res = await fetch("http://localhost:5004/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    // Handle success and error responses
    if (res.ok) {
      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to login page
    } else {
      alert(data.message || "Registration failed. Please try again.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="register-container">
      {/* Floating leaf elements for animation */}
      <div className="floating-leaf one"></div>
      <div className="floating-leaf two"></div>
      <div className="floating-leaf three"></div>

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Register</button>
      </form>

      <div className="register-link">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
}

export default Register;
