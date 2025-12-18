import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/agents/login`, {
        email,
        password
      });

      if (response.data.success) {
        // Store agent info in localStorage
        localStorage.setItem("agentToken", response.data.token);
        localStorage.setItem("agentID", response.data.agent.id);
        localStorage.setItem("agentName", response.data.agent.name);
        localStorage.setItem("agentEmail", response.data.agent.email);
        
        // Redirect to agent dashboard
        navigate("/agent/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video autoPlay muted loop playsInline
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", top: 0, left: 0, zIndex: -1 }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Top Navbar */}
      <div style={{
        width: "100%", height: "70px", position: "fixed", top: 0, left: 0,
        backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.15)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            left: "20px",
            padding: "8px 16px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            color: "white",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
        <h1 style={{
          color: "white", fontSize: "28px", fontWeight: "600", letterSpacing: "1px",
          margin: 0, textShadow: "0 0 10px rgba(0,0,0,0.4)"
        }}>
          Cultural Vault - Agent Login
        </h1>
      </div>

      {/* Login Box */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "120px", padding: "20px" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.18)", backdropFilter: "blur(12px)",
          padding: "40px", borderRadius: "18px", width: "400px", color: "white",
          boxShadow: "0 6px 28px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.28)"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px" }}>
            Agent Login
          </h2>

          {error && (
            <div style={{
              background: "rgba(255, 0, 0, 0.2)",
              border: "1px solid red",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="agent@example.com"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  outline: "none",
                  fontSize: "15px"
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  outline: "none",
                  fontSize: "15px"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                background: loading ? "rgba(0,0,0,0.3)" : "rgba(255,215,0,0.9)",
                color: loading ? "#fff" : "#1f2733",
                border: "none",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.3s"
              }}
            >
              {loading ? "Logging in..." : "Login as Agent"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
            Not an agent? <a href="/auth" style={{ color: "#ffd700", textDecoration: "none" }}>User Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}