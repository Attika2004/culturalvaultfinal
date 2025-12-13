import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitySelection.css";

export default function CitySelection() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => setNavOpen(!navOpen);

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

      {/* Cities list */}
      <div className="cities-container">
        {/* Lahore card with navigation */}
        <div
          className="city-card"
          onClick={() => navigate("/lahore-options")}
        >
          <h3>Lahore</h3>
        </div>

        {/* Other cities without navigation */}
        <div className="city-card">
          <h3>Karachi</h3>
        </div>

        <div className="city-card">
          <h3>Islamabad</h3>
        </div>
      </div>
    </div>
  );
}