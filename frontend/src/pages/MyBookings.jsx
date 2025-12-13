import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/my-bookings" } });
      return;
    }

    const saved = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setBookings(saved);
  }, [navigate]);

  return (
    <div className="mybookings-wrapper">

      {/* HEADER */}
      <header className="header">
        <button className="back-btn" onClick={() => navigate("/city-selection")}>
          ‹ Back
        </button>
        <h1 className="brand">Cultural Vault</h1>
      </header>

      {/* TITLE */}
      <h2 className="title">My Bookings</h2>

      {/* NO BOOKINGS */}
      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No Bookings Found</h3>
          <p>You haven’t booked any tours yet.</p>
          <button className="explore-btn" onClick={() => navigate("/lahore-sites")}>
            Book a Tour
          </button>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((b, i) => (
            <div className="booking-card-new" key={i}>

              <div className="card-header">
                <h3>Booking #{bookings.length - i}</h3>
                <span className="status success">Confirmed</span>
              </div>

              <div className="card-body">
                <div className="row">
                  <span>Date</span>
                  <p>{b.date}</p>
                </div>

                <div className="row">
                  <span>Guests</span>
                  <p>{b.guests}</p>
                </div>

                <div className="row">
                  <span>Sites</span>
                  <p className="sites">{b.sites}</p>
                </div>

                <div className="row">
                  <span>Package</span>
                  <p>{b.package}</p>
                </div>

                <div className="row">
                  <span>Transport</span>
                  <p>{b.transport}</p>
                </div>

                <div className="row">
                  <span>Total</span>
                  <p className="price">Rs. {b.total}</p>
                </div>
              </div>

              <div className="agent-box">
                <h4>Assigned Tour Agent</h4>
                <p><strong>Name:</strong> {b.agent.name}</p>
                <p><strong>Phone:</strong> {b.agent.phone}</p>
                <p><strong>Email:</strong> {b.agent.email}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
