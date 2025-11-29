import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitySelection.css"; // We'll create this next


// Example city data (replace with dynamic fetch from backend later)
const citiesData = [
  {
    name: "Lahore",
    images: ["/images/lahore1.jpg", "/images/lahore2.jpg", "/images/lahore3.jpg"],
  },
  {
    name: "Karachi",
    images: ["/images/karachi1.jpg", "/images/karachi2.jpg", "/images/karachi3.jpg"],
  },
  {
    name: "Islamabad",
    images: ["/images/islamabad1.jpg", "/images/islamabad2.jpg", "/images/islamabad3.jpg"],
  },
];

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
        <button onClick={() => {
          navigate("/"); // redirect to login or home
          localStorage.clear(); // optional logout action
        }}>Logout</button>
      </div>

      {/* Heading */}
      <h2 className="page-heading">Select Your City</h2>

      {/* Cities list */}
      <div className="cities-container">
        {citiesData.map((city) => (
          <div key={city.name} className="city-card" onClick={() => navigate(`/options/${city.name}`)}>
            <h3>{city.name}</h3>
            <div className="city-images">
              {city.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${city.name}-${idx}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
