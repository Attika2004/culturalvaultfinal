import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    // Placeholder: fetch bookings (replace with API)
    setBookings([
      {
        id: 1,
        user: "Ali Khan",
        site: "Badshahi Mosque",
        city: "Lahore",
        date: "2025-12-05",
        status: "Pending"
      },
      {
        id: 2,
        user: "Sara Ahmed",
        site: "Clifton Beach",
        city: "Karachi",
        date: "2025-12-10",
        status: "Completed"
      },
      {
        id: 3,
        user: "Ahmed Raza",
        site: "Faisal Mosque",
        city: "Islamabad",
        date: "2025-12-12",
        status: "Pending"
      }
    ]);
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.id.toString() === searchQuery ||
      b.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.site.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = () => {
    alert(`Booking ${selectedBookingId} status updated to ${updateStatus}`);
  };

  const handleDeleteBooking = () => {
    alert(`Booking ${selectedBookingId} deleted`);
  };

  const totalBookings = bookings.length;
  const completed = bookings.filter(b => b.status === "Completed").length;
  const pending = bookings.filter(b => b.status === "Pending").length;
  const cancelled = bookings.filter(b => b.status === "Cancelled").length;

  return (
    <AdminLayout>
    <div className="bookings-container">
      <h1 className="page-title">Manage Bookings</h1>
      <p className="page-subtext">Search, view, update or delete bookings below.</p>

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
          placeholder="Search by Booking ID, User, or Site"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Site</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.user}</td>
                    <td>{b.site}</td>
                    <td>{b.city}</td>
                    <td>{b.date}</td>
                    <td>{b.status}</td>
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
