import React from "react";
import { useNavigate } from "react-router-dom";
import "./LahoreSites.css";

const sites = [
  {
    name: "Badshahi Mosque",
    description: "One of the largest mosques in the world, with stunning Mughal architecture.",
    image: "/1.jpg",
    route: "/badshahi-mosque"
  },
  {
    name: "Lahore Fort (Shahi Qila)",
    description: "This is probably the most charming and grand fort in entire Pakistan.",
    image: "/2.jpg",
    route: "/lahore-fort"
  },
  {
    name: "Walled City of Lahore",
    description: "The historic walled city area of Lahore with rich cultural heritage.",
    image: "/3.jpg",
    route: "/walled-city"
  },
  {
    name: "Wagah Border",
    description: "The ceremonial border crossing point between India and Pakistan.",
    image: "/4.jpg",
    route: "/wagah-border"
  },
  {
    name: "Minar-e-Pakistan",
    description: "A national monument symbolizing Pakistan's independence.",
    image: "/5.jpg",
    route: "/minar-e-pakistan"
  },
  {
    name: "Shalimar Gardens",
    description: "Mughal-era gardens, showcasing Islamic architecture and beauty.",
    image: "/6.jpg",
    route: "/shalimar-gardens"
  },
  {
    name: "Wazir Khan Mosque",
    description: "A stunning mosque famous for its intricate tile work and frescoes.",
    image: "/7.jpg",
    route: "/wazir-khan-mosque"
  },
  {
    name: "Lahore Museum",
    description: "A museum with artifacts and exhibits showcasing the region's history.",
    image: "/8.jpg",
    route: "/lahore-museum"
  },
  {
    name: "Anarkali Bazaar",
    description: "One of the oldest surviving markets in South Asia.",
    image: "/9.jpg",
    route: "/anarkali-bazaar"
  },
  {
    name: "Food Street (Fort Road)",
    description: "A vibrant street famous for its delicious local cuisine.",
    image: "/10.jpg",
    route: "/food-street"
  },
  {
    name: "Tomb of Jahangir",
    description: "The mausoleum of Mughal Emperor Jahangir, with beautiful gardens.",
    image: "/11.jpg",
    route: "/jahangir-tomb"
  },
  {
    name: "Bagh-e-Jinnah (Lawrence Garden)",
    description: "A massive and historical park in the heart of the city.",
    image: "/12.jpg",
    route: "/bagh-e-jinnah"
  },
];

export default function LahoreSites() {
  const navigate = useNavigate();

  function handleSiteClick(siteName) {
    const site = sites.find(s => s.name === siteName);
    if (site) {
      navigate(site.route);
    }
  }

  function handleBookTour() {
    // Always redirect to login page, regardless of login status
    navigate("/auth", { state: { from: "/tour-booking" } });
  }

  return (
    <div className="lahore-timeline-page">
      <div className="top-bar">
        <h1>Cultural Vault</h1>
      </div>

      <h2 className="page-title">Explore Lahore's Sites</h2>

      <div className="timeline-container">
        {sites.map((site, idx) => (
          <div
            key={idx}
            className="timeline-item"
            onClick={() => handleSiteClick(site.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="content-left">
              <img src={site.image} alt={site.name} />
            </div>
            <div className="content-center">
              <div className="circle"></div>
              {idx !== sites.length - 1 && <div className="line"></div>}
            </div>
            <div className="content-right">
              <h3>{site.name}</h3>
              <p>{site.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Book Tour Button at Bottom */}
      <div className="book-tour-section-bottom">
        <button onClick={handleBookTour} className="btn-book-tour-bottom">
          📅 Book a Guided Tour
        </button>
        <p className="book-tour-subtitle">Plan your complete tour with our expert guides</p>
      </div>
    </div>
  );
}