import React, { useState, useEffect } from "react";
import AgentLayout from "../components/AgentLayout";
import axios from "axios";
import "./AgentDashboard.css";

const API_URL = "http://localhost:5000/api";

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingStats();
  }, []);

  const fetchBookingStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bookings/all`);
      
      if (response.data.success) {
        const bookings = response.data.bookings;
        const today = new Date().toDateString();
        
        setStats({
          totalBookings: bookings.length,
          todayBookings: bookings.filter(b => 
            new Date(b.bookingDate).toDateString() === today
          ).length,
          upcomingBookings: bookings.filter(b => 
            new Date(b.date) > new Date()
          ).length,
          completedBookings: bookings.filter(b => 
            b.status === "Completed"
          ).length
        });
      }
    } catch (err) {
      console.error("Error fetching booking stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgentLayout>
      <div className="dashboard-container">
        <h1 className="welcome-text">Welcome, Agent!</h1>
        <p className="welcome-subtext">Here is your bookings overview</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading statistics...</p>
          </div>
        ) : (
          <div className="stats-grid">
            <div className="stat-box">
              <h2>{stats.totalBookings}</h2>
              <p>Total Bookings</p>
            </div>

            <div className="stat-box">
              <h2>{stats.todayBookings}</h2>
              <p>Today's Bookings</p>
            </div>

            <div className="stat-box">
              <h2>{stats.upcomingBookings}</h2>
              <p>Upcoming Tours</p>
            </div>

            <div className="stat-box">
              <h2>{stats.completedBookings}</h2>
              <p>Completed Tours</p>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;