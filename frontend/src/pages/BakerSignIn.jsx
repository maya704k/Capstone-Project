// src/pages/BakerSignIn.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BakerSignIn() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);  

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Sign in failed.");
      }

      if (data.role !== "baker") {
        throw new Error("This account is not registered as a baker.");
      }

      localStorage.setItem("id", data.id);
      localStorage.setItem("bakerToken", data.token);
      localStorage.setItem("bakerUser", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gradient-bg full-center">
      <div className="auth-card">
        <div className="auth-logo-circle">🎂</div>
        <h2 className="auth-title">Baker Portal</h2>
        <p className="auth-subtitle">Sign in to manage your business</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span className="field-label">Email Address</span>
            <input
              type="email"
              className="input"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="auth-row">
            <label className="checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>

          {error && <p className="auth-error-text">{error}</p>}

          <button type="submit" className="primary-btn wide">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          New baker?{" "}
          <Link to="/baker/sign-up" className="link-accent">
            Create account
          </Link>
        </p>

        <button
          className="link-button back-link"
          onClick={() => navigate("/")}
        >
          ⟵ Back to welcome page
        </button>
      </div>
    </div>
  );
}
