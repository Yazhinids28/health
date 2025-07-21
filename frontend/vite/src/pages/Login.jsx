import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // Importing the login CSS

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5004/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/remedies"); // ✅ Redirect to remedies page
    } else {
      alert(data.message || "❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>🔐 Login to Your Wellness Portal</h2>

        <input
          type="email"
          placeholder="📧 Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="🔑 Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="input-field"
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "🌿 Logging in..." : "🚀 Login"}
        </button>
      </form>

      <p className="register-link">
        🙋‍♀️ New to wellness? <Link to="/register">Register here ✨</Link>
      </p>
    </div>
  );
}

export default Login;
