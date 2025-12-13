import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        style={{ 
          position: "fixed", 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          top: 0, 
          left: 0, 
          zIndex: -1 
        }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Top bar */}
      <div style={{
        width: "100%",
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <button 
          onClick={() => navigate("/city-selection")}
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
          color: "white",
          fontSize: "28px",
          fontWeight: 600,
          margin: 0,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
        }}>
          Cultural Vault
        </h1>
      </div>

      {/* Content */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "100px 20px 40px",
        minHeight: "100vh"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          borderRadius: "18px",
          maxWidth: "800px",
          width: "100%",
          color: "white",
          boxShadow: "0 6px 28px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.28)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "30px",
            textShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
          }}>
            About Us
          </h2>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "24px",
              marginBottom: "12px",
              color: "#ffd700",
              textShadow: "0 0 8px rgba(0, 0, 0, 0.3)"
            }}>
              Who We Are
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "15px" }}>
              Cultural Vault is your gateway to discovering the rich heritage and 
              historical landmarks of Pakistan. We are dedicated to preserving and 
              promoting the cultural treasures of our nation, making them accessible 
              to tourists and history enthusiasts from around the world.
            </p>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "24px",
              marginBottom: "12px",
              color: "#ffd700",
              textShadow: "0 0 8px rgba(0, 0, 0, 0.3)"
            }}>
              Our Mission
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "15px" }}>
              We believe in connecting people with history. Our platform provides 
              comprehensive information about historical sites, facilitates guided 
              tours, and helps preserve our cultural legacy for future generations.
            </p>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{
              fontSize: "24px",
              marginBottom: "12px",
              color: "#ffd700",
              textShadow: "0 0 8px rgba(0, 0, 0, 0.3)"
            }}>
              What We Offer
            </h3>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {[
                "Detailed information about historical sites",
                "Professional guided tour bookings",
                "Expert tour guides and agents",
                "Authentic reviews and ratings",
                "Interactive maps and locations",
                "Cultural events and festivals"
              ].map((item, idx) => (
                <li key={idx} style={{
                  padding: "8px 0",
                  paddingLeft: "25px",
                  position: "relative",
                  lineHeight: "1.6"
                }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    color: "#ffd700",
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "30px"
          }}>
            <h3 style={{
              fontSize: "24px",
              marginBottom: "20px",
              color: "#ffd700",
              textAlign: "center"
            }}>
              Contact Us
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "8px"
              }}>
                <span style={{ fontWeight: 600, minWidth: "140px" }}>📞 Phone:</span>
                <span>+92 300 1234567</span>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "8px"
              }}>
                <span style={{ fontWeight: 600, minWidth: "140px" }}>📧 Email:</span>
                <span>info@culturalvault.pk</span>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "8px"
              }}>
                <span style={{ fontWeight: 600, minWidth: "140px" }}>📍 Address:</span>
                <span>Lahore, Punjab, Pakistan</span>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "8px"
              }}>
                <span style={{ fontWeight: 600, minWidth: "140px" }}>⏰ Hours:</span>
                <span>9:00 AM - 6:00 PM (Mon-Sat)</span>
              </div>
            </div>
          </div>

          <p style={{
            fontStyle: "italic",
            textAlign: "center",
            fontSize: "16px",
            marginTop: "30px"
          }}>
            Join us in exploring Pakistan's magnificent cultural heritage!
          </p>
        </div>
      </div>
    </div>
  );
}