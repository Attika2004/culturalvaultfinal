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

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings when search query changes
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
      if (response.data.success) {
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings from server");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = () => {
    if (!selectedBookingId || !updateStatus) {
      alert("Please enter Booking ID and select a status");
      return;
    }
    alert(`Booking ${selectedBookingId} status would be updated to ${updateStatus} (Feature coming soon)`);
  };

  const handleDeleteBooking = () => {
    if (!selectedBookingId) {
      alert("Please enter Booking ID");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete booking ${selectedBookingId}?`);
    if (confirmDelete) {
      alert(`Booking ${selectedBookingId} would be deleted (Feature coming soon)`);
    }
  };

  const totalBookings = bookings.length;
  const completed = bookings.filter(b => b.status === "Completed").length;
  const pending = bookings.filter(b => b.status === "Pending" || b.status === "Confirmed").length;
  const cancelled = bookings.filter(b => b.status === "Cancelled").length;

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
            marginBottom: "20px"
          }}>
            {error}
          </div>
        )}

        {/* Booking Stats */}
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

        {/* Search & Table */}
        <section className="bookings-section">
          <input
            type="text"
            placeholder="Search by Booking ID, Name, Email, or Sites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="bookings-list">
            {loading ? (
              <p style={{ textAlign: "center", color: "#fff", padding: "20px" }}>
                Loading bookings...
              </p>
            ) : filteredBookings.length === 0 ? (
              <p style={{ textAlign: "center", color: "#fff", padding: "20px" }}>
                No bookings found.
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Sites</th>
                    <th>Guests</th>
                    <th>Package</th>
                    <th>Transport</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    <th>Booked On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(b => (
                    <tr key={b.BookingID}>
                      <td>{b.BookingID}</td>
                      <td>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.selectedSites}</td>
                      <td>{b.guests}</td>
                      <td>{b.tourPackage}</td>
                      <td>{b.travelMode}</td>
                      <td>Rs. {b.totalCost}</td>
                      <td>{b.status || "Confirmed"}</td>
                      <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
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
            <button className="action-btn" onClick={handleUpdateStatus}>Update Status</button>
            <button className="action-btn delete-btn" onClick={handleDeleteBooking}>Delete Booking</button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Bookings;