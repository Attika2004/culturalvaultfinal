import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CitySelection.css";

export default function CitySelection() {
  const [navOpen, setNavOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleNav = () => setNavOpen(!navOpen);

  // Fetch cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/admin/cities");
        setCities(response.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (cityName) => {
    // Navigate to city-specific options page
    navigate(`/city/${cityName.toLowerCase()}/options`);
  };

  return (
    <div className="city-page">
      {/* Background video */}
      <video autoPlay muted loop className="background-video">
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Top bar */}
      <div className="top-bar">
        <div className="hamburger" onClick={toggleNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1>Cultural Vault</h1>
      </div>

      {/* Side Navigation */}
      <div className={`side-nav ${navOpen ? "open" : ""}`}>
        <button onClick={() => navigate("/my-bookings")}>My Bookings</button>
        <button onClick={() => navigate("/about-us")}>About Us</button>
        <button
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </div>

      {/* Heading */}
      <h2 className="page-heading">Select Your City</h2>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
          <p style={{ fontSize: "24px" }}>Loading cities...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          textAlign: "center",
          color: "white",
          marginTop: "50px",
          padding: "20px",
          background: "rgba(255, 0, 0, 0.2)",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "50px auto"
        }}>
          <p style={{ fontSize: "18px" }}>{error}</p>
        </div>
      )}

      {/* Cities list */}
      {!loading && !error && (
        <div className="cities-container">
          {cities.length === 0 ? (
            <div style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
              <p style={{ fontSize: "20px" }}>No cities available yet.</p>
              <p style={{ fontSize: "16px", marginTop: "10px" }}>
                Please contact the administrator to add cities.
              </p>
            </div>
          ) : (
            cities.map((city) => (
              <div
                key={city.CityID}
                className="city-card"
                onClick={() => handleCityClick(city.CityName)}
              >
                <h3>{city.CityName}</h3>
                {city.Province && (
                  <p style={{ fontSize: "14px", marginTop: "5px", opacity: 0.8 }}>
                    {city.Province}
                  </p>
                )}
                {city.Description && (
                  <p style={{ 
                    fontSize: "13px", 
                    marginTop: "10px", 
                    opacity: 0.9,
                    lineHeight: "1.4"
                  }}>
                    {city.Description.substring(0, 100)}...
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}