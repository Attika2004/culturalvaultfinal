import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitySelection.css"; // CSS stays the same

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
            navigate("/"); // redirect to login or home
            localStorage.clear(); // optional logout action
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
          <div className="city-images">
            <img src="/images/lahore1.jpg" alt="Lahore1" />
            <img src="/images/lahore2.jpg" alt="Lahore2" />
            <img src="/images/lahore3.jpg" alt="Lahore3" />
          </div>
        </div>

        {/* Other cities without navigation */}
        <div className="city-card">
          <h3>Karachi</h3>
          <div className="city-images">
            <img src="/images/karachi1.jpg" alt="Karachi1" />
            <img src="/images/karachi2.jpg" alt="Karachi2" />
            <img src="/images/karachi3.jpg" alt="Karachi3" />
          </div>
        </div>

        <div className="city-card">
          <h3>Islamabad</h3>
          <div className="city-images">
            <img src="/images/islamabad1.jpg" alt="Islamabad1" />
            <img src="/images/islamabad2.jpg" alt="Islamabad2" />
            <img src="/images/islamabad3.jpg" alt="Islamabad3" />
          </div>
        </div>
      </div>
    </div>
  );
}
