import React, { useEffect, useState } from "react";
import AgentLayout from "../components/AgentLayout";
import axios from "axios";
import "./AgentDashboard.css";

const API_URL = "http://localhost:5000/api";

const AgentDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/bookings/all`);
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SAME DATE LOGIC AS ADMIN
  const getEffectiveStatus = (booking) => {
    if (!booking.date) return booking.status || "Confirmed";

    const tourDate = new Date(booking.date);
    const today = new Date();

    tourDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (tourDate < today) return "Completed";
    return booking.status || "Confirmed";
  };

  // 🔹 DASHBOARD STATS
  const totalTours = bookings.length;

  const completedTours = bookings.filter(
    (b) => getEffectiveStatus(b) === "Completed"
  ).length;

  const upcomingTours = bookings.filter(
    (b) =>
      getEffectiveStatus(b) === "Confirmed" ||
      getEffectiveStatus(b) === "Pending"
  ).length;

  const cancelledTours = bookings.filter(
    (b) => getEffectiveStatus(b) === "Cancelled"
  ).length;

  return (
    <AgentLayout>
      <div className="dashboard-container">
        <h1 className="welcome-text">Welcome, Agent!</h1>
        <p className="welcome-subtext">Here is your tour overview</p>

        {loading ? (
          <p style={{ color: "#fff" }}>Loading dashboard...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-box">
              <h2>{totalTours}</h2>
              <p>Total Tours</p>
            </div>

            <div className="stat-box completed">
              <h2>{completedTours}</h2>
              <p>Completed Tours</p>
            </div>

            <div className="stat-box upcoming">
              <h2>{upcomingTours}</h2>
              <p>Upcoming Tours</p>
            </div>

            <div className="stat-box cancelled">
              <h2>{cancelledTours}</h2>
              <p>Cancelled Tours</p>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
