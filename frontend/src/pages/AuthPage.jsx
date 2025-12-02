import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Temporary login bypass
      alert("Login successful!");
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("userID", "dummy-user");
      navigate("/city-selection"); // Navigate to CitySelection page
    } else {
      // Sign-Up (UI only for now)
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      alert("Registration successful! Please login.");
      setIsLogin(true);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
        <h1 style={{
          color: "white", fontSize: "28px", fontWeight: "600", letterSpacing: "1px",
          margin: 0, textShadow: "0 0 10px rgba(0,0,0,0.4)"
        }}>
          Cultural Vault
        </h1>
      </div>

      {/* Centered Auth Box */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "80px", padding: "20px" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.18)", backdropFilter: "blur(12px)",
          padding: "28px", borderRadius: "18px", width: "360px", color: "white",
          boxShadow: "0 6px 28px rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.28)"
        }}>

          {/* Toggle Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "18px" }}>
            <button onClick={() => setIsLogin(true)} style={{
              padding: "8px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.32)",
              background: isLogin ? "rgba(255,255,255,0.26)" : "transparent",
              color: "white", cursor: "pointer", fontWeight: 600, backdropFilter: "blur(6px)"
            }}>Login</button>
            <button onClick={() => setIsLogin(false)} style={{
              padding: "8px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.32)",
              background: !isLogin ? "rgba(255,255,255,0.26)" : "transparent",
              color: "white", cursor: "pointer", fontWeight: 600, backdropFilter: "blur(6px)"
            }}>Sign Up</button>
          </div>

          <h3 style={{ textAlign: "center", margin: "6px 0 18px 0", fontWeight: 600 }}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input type="text" placeholder="Full Name" required value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.32)",
                  color: "white", outline: "none"
                }}
              />
            )}
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px",
                background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.32)",
                color: "white", outline: "none"
              }}
            />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px",
                background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.32)",
                color: "white", outline: "none"
              }}
            />
            {!isLogin && (
              <input type="password" placeholder="Confirm Password" required value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.32)",
                  color: "white", outline: "none"
                }}
              />
            )}
            <button type="submit" style={{
              width: "100%", padding: "12px", marginTop: "6px", borderRadius: "10px",
              background: "rgba(0,0,0,0.45)", color: "white", border: "1px solid rgba(255,255,255,0.28)",
              backdropFilter: "blur(6px)", cursor: "pointer", fontSize: "15px", fontWeight: 700
            }}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Admin Login */}
          <div style={{ marginTop: "14px", display: "flex", justifyContent: "center" }}>
            <button onClick={() => alert("Admin login (demo)")} style={{
              padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.28)",
              background: "transparent", color: "white", cursor: "pointer", fontWeight: 600
            }}>Admin Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
