import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import "./Bookings.css";

const API_URL = "http://localhost:5000/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (b) =>
          b.BookingID?.toString().includes(searchQuery) ||
          b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.selectedSites?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${API_URL}/bookings/all`);
      
      if (response.data && response.data.success) {
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.error || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedBookingId || !updateStatus) {
      alert("Please enter Booking ID and select a status");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/bookings/${selectedBookingId}/status`,
        { status: updateStatus }
      );

      if (response.data.success) {
        alert(`Booking ${selectedBookingId} status updated successfully!`);
        fetchBookings();
        setSelectedBookingId("");
        setUpdateStatus("");
      }
    } catch (err) {
      alert(`Failed to update: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBookingId) {
      alert("Please enter Booking ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete booking ${selectedBookingId}?`)) {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_URL}/bookings/${selectedBookingId}`);

        if (response.data.success) {
          alert("Booking deleted successfully!");
          fetchBookings();
          setSelectedBookingId("");
        }
      } catch (err) {
        alert(`Failed to delete: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const totalBookings = bookings.length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const pending = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed"
  ).length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <AdminLayout>
      <div className="bookings-container">
        <h1 className="page-title">Manage Bookings</h1>
        <p className="page-subtext">Search, view, update or delete bookings below.</p>

        {error && (
          <div style={{
            background: "rgba(255, 0, 0, 0.1)",
            border: "1px solid red",
            color: "red",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>⚠️ {error}</span>
            <button
              onClick={fetchBookings}
              style={{
                padding: "8px 16px",
                background: "#fff",
                border: "1px solid red",
                borderRadius: "6px",
                cursor: "pointer",
                color: "red",
                fontWeight: "600"
              }}
            >
              🔄 Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{totalBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelled</h3>
            <p>{cancelled}</p>
          </div>
        </div>

        {/* Search */}
        <section style={{
          background: "rgba(44,44,62,0.9)",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
        }}>
          <input
            type="text"
            placeholder="Search by Booking ID, Name, Email, or Sites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              outline: "none"
            }}
          />
        </section>

        {/* Bookings List */}
        <section style={{
          background: "rgba(44,44,62,0.9)",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}>
          <h2 style={{ color: "#fff", marginBottom: "20px" }}>Bookings</h2>
          
          {loading ? (
            <div style={{ textAlign: "center", color: "#fff", padding: "40px" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>⏳</div>
              <p>Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div style={{ textAlign: "center", color: "#fff", padding: "40px" }}>
              <div style={{ fontSize: "60px", marginBottom: "10px" }}>📭</div>
              <p>No bookings found.</p>
            </div>
          ) : (
            <div>
              {filteredBookings.map((booking, index) => (
                <div 
                  key={booking.BookingID || index}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    color: "#fff",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                >
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                    gap: "15px" 
                  }}>
                    <div>
                      <strong style={{ color: "#ffd700" }}>ID:</strong> {booking.BookingID}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Name:</strong> {booking.name}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Email:</strong> {booking.email}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Phone:</strong> {booking.phone}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Time:</strong> {booking.time}
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <strong style={{ color: "#ffd700" }}>Sites:</strong> {booking.selectedSites}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Guests:</strong> {booking.guests}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Package:</strong> {booking.tourPackage}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Transport:</strong> {booking.travelMode}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Total:</strong> Rs. {booking.totalCost}
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Status:</strong>{" "}
                      <span style={{
                        background: booking.status === "Completed" ? "#4caf50" : 
                                   booking.status === "Cancelled" ? "#f44336" : "#ff9800",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {booking.status || "Confirmed"}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: "#ffd700" }}>Booked On:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Actions */}
        <section className="actions-section">
          <h2>Update or Delete Booking</h2>
          <input
            type="text"
            placeholder="Enter Booking ID"
            value={selectedBookingId}
            onChange={(e) => setSelectedBookingId(e.target.value)}
          />
          <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="actions-btns">
            <button 
              className="action-btn" 
              onClick={handleUpdateStatus} 
              disabled={loading}
            >
              {loading ? "⏳ Updating..." : "Update Status"}
            </button>
            <button 
              className="action-btn delete-btn" 
              onClick={handleDeleteBooking} 
              disabled={loading}
            >
              {loading ? "⏳ Deleting..." : "Delete Booking"}
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Bookings;