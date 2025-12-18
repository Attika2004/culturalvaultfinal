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

  // 🔹 AUTO STATUS BASED ON DATE
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
      if (response.data?.success) {
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
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
        alert("Status updated!");
        fetchBookings();
        setSelectedBookingId("");
        setUpdateStatus("");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBookingId) return alert("Enter Booking ID");
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/bookings/${selectedBookingId}`
      );
      if (response.data.success) {
        alert("Booking deleted!");
        fetchBookings();
        setSelectedBookingId("");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STATS (DATE-AWARE)
  const totalBookings = bookings.length;
  const completed = bookings.filter(
    (b) => getEffectiveStatus(b) === "Completed"
  ).length;
  const pending = bookings.filter(
    (b) =>
      getEffectiveStatus(b) === "Pending" ||
      getEffectiveStatus(b) === "Confirmed"
  ).length;
  const cancelled = bookings.filter(
    (b) => getEffectiveStatus(b) === "Cancelled"
  ).length;

  // 🔹 CSV DOWNLOAD (DATE-AWARE STATUS)
  const downloadCSV = () => {
    if (!bookings.length) return alert("No bookings");

    const headers = [
      "BookingID",
      "Name",
      "Email",
      "Phone",
      "Date",
      "Time",
      "Sites",
      "Guests",
      "Package",
      "Transport",
      "Total Cost",
      "Status",
      "Booking Date"
    ];

    const rows = bookings.map((b) => [
      b.BookingID,
      b.name,
      b.email,
      b.phone,
      new Date(b.date).toLocaleDateString(),
      b.time,
      b.selectedSites,
      b.guests,
      b.tourPackage,
      b.travelMode,
      b.totalCost,
      getEffectiveStatus(b),
      new Date(b.bookingDate).toLocaleDateString()
    ]);

    const csv =
      [headers, ...rows]
        .map((r) => r.map((c) => `"${c ?? ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "all_bookings.csv";
    link.click();
  };

  return (
    <AdminLayout>
      <div className="bookings-container">
        <h1 className="page-title">Manage Bookings</h1>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card"><h3>Total</h3><p>{totalBookings}</p></div>
          <div className="stat-card"><h3>Completed</h3><p>{completed}</p></div>
          <div className="stat-card"><h3>Pending</h3><p>{pending}</p></div>
          <div className="stat-card"><h3>Cancelled</h3><p>{cancelled}</p></div>
        </div>

        {/* CSV */}
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <button onClick={downloadCSV} className="action-btn">
            ⬇️ Download CSV
          </button>
        </div>

        {/* Bookings */}
        <section className="bookings-section">
          {loading ? (
            <p style={{ color: "#fff" }}>Loading...</p>
          ) : (
            filteredBookings.map((booking, i) => (
              <div key={i} className="booking-card">
                <p><b>ID:</b> {booking.BookingID}</p>
                <p><b>Name:</b> {booking.name}</p>
                <p><b>Email:</b> {booking.email}</p>
                <p><b>Date:</b> {new Date(booking.date).toLocaleDateString()}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`status ${getEffectiveStatus(booking).toLowerCase()}`}>
                    {getEffectiveStatus(booking)}
                  </span>
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default Bookings;
