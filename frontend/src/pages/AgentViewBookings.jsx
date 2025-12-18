import React, { useState, useEffect } from "react";
import AgentLayout from "../components/AgentLayout";
import axios from "axios";
import "./AgentViewBookings.css";

const API_URL = "http://localhost:5000/api";

const AgentViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterStatus, bookings]);

  // 🔹 SAME LOGIC AS ADMIN
  const getEffectiveStatus = (booking) => {
    if (!booking.date) return booking.status || "Confirmed";

    const bookingDate = new Date(booking.date);
    const today = new Date();

    bookingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) return "Completed";
    return booking.status || "Confirmed";
  };

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
      console.error(err);
      setError("Failed to fetch bookings from server");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    // 🔍 Search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (b) =>
          b.BookingID?.toString().includes(searchQuery) ||
          b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.phone?.includes(searchQuery) ||
          b.selectedSites?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🔹 STATUS FILTER (DATE-AWARE)
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (b) =>
          getEffectiveStatus(b).toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredBookings(filtered);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  // 🔹 STATS (DATE-AWARE)
  const totalBookings = bookings.length;
  const confirmed = bookings.filter(
    (b) => getEffectiveStatus(b) === "Confirmed"
  ).length;
  const completed = bookings.filter(
    (b) => getEffectiveStatus(b) === "Completed"
  ).length;

  return (
    <AgentLayout>
      <div className="view-bookings-container">
        <h1 className="page-title">View All Bookings</h1>
        <p className="page-subtext">Search and view all tour bookings</p>

        {error && <div className="error-message">{error}</div>}

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{totalBookings}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmed</h3>
            <p>{confirmed}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <input
            type="text"
            placeholder="Search by ID, Name, Email, Phone, or Sites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button onClick={fetchBookings} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {/* Bookings Table */}
        <section className="bookings-section">
          <div className="bookings-list">
            {loading ? (
              <p className="center-text">Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
              <p className="center-text">No bookings found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tour Date</th>
                    <th>Guests</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.BookingID}>
                      <td>{b.BookingID}</td>
                      <td>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.guests}</td>
                      <td>Rs. {b.totalCost}</td>
                      <td>
                        <span
                          className={`status-badge ${getEffectiveStatus(b).toLowerCase()}`}
                        >
                          {getEffectiveStatus(b)}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewDetails(b)}
                          className="view-btn"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>

              <h2>Booking Details</h2>

              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><b>ID:</b> {selectedBooking.BookingID}</p>
                <p><b>Name:</b> {selectedBooking.name}</p>
                <p><b>Email:</b> {selectedBooking.email}</p>
                <p><b>Phone:</b> {selectedBooking.phone}</p>
              </div>

              <div className="detail-section">
                <h3>Tour Information</h3>
                <p><b>Date:</b> {new Date(selectedBooking.date).toLocaleDateString()}</p>
                <p><b>Time:</b> {selectedBooking.time}</p>
                <p><b>Guests:</b> {selectedBooking.guests}</p>
                <p><b>Sites:</b> {selectedBooking.selectedSites}</p>
                <p><b>Package:</b> {selectedBooking.tourPackage}</p>
                <p><b>Transport:</b> {selectedBooking.travelMode}</p>
              </div>

              <div className="detail-section">
                <h3>Payment</h3>
                <p><b>Total:</b> Rs. {selectedBooking.totalCost}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`status-badge ${getEffectiveStatus(selectedBooking).toLowerCase()}`}
                  >
                    {getEffectiveStatus(selectedBooking)}
                  </span>
                </p>
                <p>
                  <b>Booked On:</b>{" "}
                  {new Date(selectedBooking.bookingDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default AgentViewBookings;
