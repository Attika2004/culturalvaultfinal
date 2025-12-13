import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyBookings.css";

const API_URL = "http://localhost:5000/api";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

    if (!token) {
      navigate("/auth", { state: { from: "/my-bookings" } });
      return;
    }

    if (userEmail) {
      fetchBookings(userEmail);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const fetchBookings = async (email) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${API_URL}/bookings/email/${email}`);
      
      if (response.data.success) {
        const fetchedBookings = response.data.bookings.map(b => ({
          date: new Date(b.date).toLocaleDateString(),
          guests: b.guests,
          sites: b.selectedSites,
          package: b.tourPackage,
          transport: b.travelMode,
          total: b.totalCost,
          agent: {
            name: "Ahmed Khan",
            phone: "+92 300 1234567",
            email: "ahmed.khan@culturalvault.pk"
          },
          bookingId: b.BookingID
        }));
        
        setBookings(fetchedBookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load your bookings. Please try again.");
      
      // Fallback to localStorage if API fails
      const saved = JSON.parse(localStorage.getItem("userBookings") || "[]");
      setBookings(saved);
    } finally {
      setLoading(false);
    }
  };

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

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{
          background: "rgba(255, 0, 0, 0.1)",
          border: "1px solid red",
          color: "red",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          maxWidth: "600px",
          margin: "0 auto 20px"
        }}>
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "60px", color: "white" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>⏳</div>
          <h3>Loading your bookings...</h3>
        </div>
      ) : bookings.length === 0 ? (
        /* NO BOOKINGS */
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No Bookings Found</h3>
          <p>You haven't booked any tours yet.</p>
          <button className="explore-btn" onClick={() => navigate("/lahore-sites")}>
            Book a Tour
          </button>
        </div>
      ) : (
        /* BOOKINGS GRID */
        <div className="booking-grid">
          {bookings.map((b, i) => (
            <div className="booking-card-new" key={i}>

              <div className="card-header">
                <h3>Booking #{b.bookingId || (bookings.length - i)}</h3>
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