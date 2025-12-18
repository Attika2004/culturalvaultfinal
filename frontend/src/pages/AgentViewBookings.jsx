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

  const applyFilters = () => {
    let filtered = [...bookings];

    // Apply search filter
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

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(b => 
        (b.status || "Confirmed").toLowerCase() === filterStatus.toLowerCase()
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

  const totalBookings = bookings.length;
  const confirmed = bookings.filter(b => (b.status || "Confirmed") === "Confirmed").length;
  const completed = bookings.filter(b => b.status === "Completed").length;

  return (
    <AgentLayout>
      <div className="view-bookings-container">
        <h1 className="page-title">View All Bookings</h1>
        <p className="page-subtext">Search and view all tour bookings</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

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
                  {filteredBookings.map(b => (
                    <tr key={b.BookingID}>
                      <td>{b.BookingID}</td>
                      <td>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.guests}</td>
                      <td>Rs. {b.totalCost}</td>
                      <td>
                        <span className={`status-badge ${(b.status || "Confirmed").toLowerCase()}`}>
                          {b.status || "Confirmed"}
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

        {/* Modal for Booking Details */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>×</button>
              
              <h2>Booking Details</h2>
              
              <div className="detail-section">
                <h3>Customer Information</h3>
                <div className="detail-row">
                  <span className="label">Booking ID:</span>
                  <span className="value">{selectedBooking.BookingID}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{selectedBooking.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{selectedBooking.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="value">{selectedBooking.phone}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Tour Information</h3>
                <div className="detail-row">
                  <span className="label">Tour Date:</span>
                  <span className="value">{new Date(selectedBooking.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Time:</span>
                  <span className="value">{selectedBooking.time}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Number of Guests:</span>
                  <span className="value">{selectedBooking.guests}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Selected Sites:</span>
                  <span className="value">{selectedBooking.selectedSites}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Tour Package:</span>
                  <span className="value">{selectedBooking.tourPackage}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Transport Mode:</span>
                  <span className="value">{selectedBooking.travelMode}</span>
                </div>
                {selectedBooking.specialRequests && (
                  <div className="detail-row">
                    <span className="label">Special Requests:</span>
                    <span className="value">{selectedBooking.specialRequests}</span>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>Payment Information</h3>
                <div className="detail-row">
                  <span className="label">Total Cost:</span>
                  <span className="value price">Rs. {selectedBooking.totalCost}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className={`value status-badge ${(selectedBooking.status || "Confirmed").toLowerCase()}`}>
                    {selectedBooking.status || "Confirmed"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Booked On:</span>
                  <span className="value">{new Date(selectedBooking.bookingDate).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default AgentViewBookings;