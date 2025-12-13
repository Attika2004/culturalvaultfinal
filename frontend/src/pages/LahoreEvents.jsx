import React from "react";
import { useNavigate } from "react-router-dom";
import "./LahoreEvents.css";

const events = [
  {
    id: 1,
    name: "Lahore Flower Show",
    date: "March 15-17",
    location: "Jilani Park (Race Course Park)",
    description: "Annual flower exhibition showcasing thousands of colorful flowers, plants, and gardening displays from across Pakistan.",
    image: "/event1.jpg",
    category: "Exhibition"
  },
  
  {
    id: 2,
    name: "Basant Festival",
    date: "February (Date TBA)",
    location: "Throughout Lahore",
    description: "Traditional kite-flying festival marking the arrival of spring, celebrated with colorful kites filling the sky.",
    image: "/basant.jpg",
    category: "Traditional"
  },
  {
    id: 3,
    name: "Lahore Food Festival",
    date: "January 12-14",
    location: "Fortress Stadium",
    description: "A culinary extravaganza featuring traditional Lahori cuisine, street food, and international delicacies.",
    image: "/food.jpg",
    category: "Food"
  },
  {
    id: 4,
    name: "Rafi Peer Theatre Festival",
    date: "November (Annual)",
    location: "Alhamra Arts Council",
    description: "International theatre festival showcasing puppet theatre, traditional performances, and modern drama.",
    image: "/rafi.jpg",
    category: "Theatre"
  },
  {
    id: 5,
    name: "Lahore Music Meet",
    date: "April (Annual)",
    location: "Various Venues",
    description: "Music festival celebrating both traditional and contemporary Pakistani music with live performances.",
    image: "/music.jpg",
    category: "Music"
  },
  {
    id: 6,
    name: "Lahore Biennale",
    date: "February-March (Biennial)",
    location: "Historical Sites & Museums",
    description: "International contemporary art festival held at various heritage sites across Lahore.",
    image: "/bb.jpg",
    category: "Art"
  },
  
  {
    id: 7,
    name: "Faiz Festival",
    date: "November (Annual)",
    location: "Alhamra Arts Council",
    description: "Literary and cultural festival celebrating the legacy of renowned poet Faiz Ahmed Faiz.",
    image: "/faiz.jpg",
    category: "Literary"
  },
  {
    id: 8,
    name: "Mela Chiraghan",
    date: "March (Annual)",
    location: "Shalimar Gardens",
    description: "Festival of lights celebrating Sufi culture with traditional music, dance, and lantern displays.",
    image: "/event2.jpg",
    category: "Religious/Cultural"
  }
];

export default function LahoreEvents() {
  const navigate = useNavigate();

  return (
    <div className="events-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/lahore-options")}>
          ← Back
        </button>
        <h1>Cultural Vault</h1>
      </div>

      <div className="events-container">
        <h2 className="page-title">Lahore Events & Festivals</h2>
        <p className="page-subtitle">Experience the vibrant culture and celebrations of Lahore</p>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.name} />
                <span className="event-category">{event.category}</span>
              </div>
              
              <div className="event-content">
                <h3>{event.name}</h3>
                
                <div className="event-info">
                  <div className="info-item">
                    <span className="icon">📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="event-description">{event.description}</p>

                <button className="btn-learn-more">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-info">
          <h3>Want to know more about upcoming events?</h3>
          <p>Contact us for the latest event schedules and booking information</p>
          <button onClick={() => navigate("/about-us")} className="btn-contact">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}