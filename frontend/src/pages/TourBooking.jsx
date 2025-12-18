import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TourBooking.css";

const API_URL = "http://localhost:5000/api";

const agents = [
  { id: 1, name: "Ahmed Khan", phone: "+92 300 1234567", email: "ahmed.khan@culturalvault.pk" },
  { id: 2, name: "Fatima Ali", phone: "+92 301 9876543", email: "fatima.ali@culturalvault.pk" },
  { id: 3, name: "Hassan Raza", phone: "+92 302 5555555", email: "hassan.raza@culturalvault.pk" },
];

const allSites = [
  { id: 1, name: "Badshahi Mosque", fee: 500 },
  { id: 2, name: "Lahore Fort", fee: 500 },
  { id: 3, name: "Walled City of Lahore", fee: 0 },
  { id: 4, name: "Wagah Border", fee: 0 },
  { id: 5, name: "Minar-e-Pakistan", fee: 300 },
  { id: 6, name: "Shalimar Gardens", fee: 500 },
  { id: 7, name: "Wazir Khan Mosque", fee: 300 },
  { id: 8, name: "Lahore Museum", fee: 400 },
  { id: 9, name: "Anarkali Bazaar", fee: 0 },
  { id: 10, name: "Food Street", fee: 0 },
  { id: 11, name: "Tomb of Jahangir", fee: 500 },
  { id: 12, name: "Bagh-e-Jinnah", fee: 200 },
];

const timeSlots = [
  "08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"
];

export default function TourBooking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    guests: 1,
    sites: [],
    tourPackage: "standard",
    transport: "car",
    paymentPlan: "full"
  });

  const [assignedAgent, setAssignedAgent] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (!token) {
      navigate("/auth", { state: { from: "/tour-booking" } });
      return;
    }

    if (userEmail) setFormData(prev => ({ ...prev, email: userEmail }));
    if (userName) setFormData(prev => ({ ...prev, name: userName }));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const selectedSitesData = allSites.filter(s => formData.sites.includes(s.id));
    const sitesFee = selectedSitesData.reduce((sum, s) => sum + s.fee, 0);

    const packagePrices = { basic: 2000, standard: 3500, premium: 5500 };
    const packageFee = packagePrices[formData.tourPackage] || 0;

    const transportPrices = { none: 0, rickshaw: 1500, car: 3000, van: 5000 };
    const transportFee = transportPrices[formData.transport] || 0;

    const subtotal = sitesFee + packageFee + transportFee;
    const discount = formData.paymentPlan === "full" ? subtotal * 0.10 : 0;
    const total = subtotal - discount;

    return { sitesFee, packageFee, transportFee, subtotal, discount, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.sites.length === 0) {
      setError("Please select at least one site to visit");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setError("Please fill all required fields");
      return;
    }

    const startIndex = timeSlots.indexOf(formData.startTime);
    const endIndex = timeSlots.indexOf(formData.endTime);
    if (startIndex >= endIndex) {
      setError("End time must be after start time");
      return;
    }

    setLoading(true);

    try {
      const selectedSitesData = allSites.filter(s => formData.sites.includes(s.id));
      const prices = calculatePrice();

      const agent = agents[Math.floor(Math.random() * agents.length)];
      setAssignedAgent(agent);

      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: `${formData.startTime} - ${formData.endTime}`,
        guests: formData.guests,
        selectedSites: selectedSitesData.map(s => s.name).join(", "),
        travelMode: formData.transport,
        tourPackage: formData.tourPackage,
        specialRequests: `Payment Plan: ${formData.paymentPlan}`,
        totalCost: Math.round(prices.total),
        agentName: agent.name,
        agentPhone: agent.phone,
        agentEmail: agent.email
      };

      const response = await axios.post(`${API_URL}/bookings`, bookingData);

      if (response.data.success) {
        const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
        const newBooking = {
          date: formData.date,
          time: `${formData.startTime} - ${formData.endTime}`,
          guests: formData.guests,
          sites: selectedSitesData.map(s => s.name).join(", "),
          package: formData.tourPackage,
          transport: formData.transport,
          total: Math.round(prices.total),
          agent: agent,
          bookingId: response.data.booking?.BookingID
        };
        existingBookings.push(newBooking);
        localStorage.setItem("userBookings", JSON.stringify(existingBookings));

        setBookingConfirmed(true);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.error || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const prices = calculatePrice();
  const selectedSitesData = allSites.filter(s => formData.sites.includes(s.id));

  if (bookingConfirmed) {
    return (
      <div className="tour-booking-page">
        <div className="top-bar">
          <h1>Cultural Vault - Tour Booking</h1>
        </div>
        <div className="booking-container">
          <div className="confirmation-box">
            <div className="success-icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p className="success-message">
              Thank you, {formData.name}! Your tour has been successfully booked for {formData.date} from {formData.startTime} to {formData.endTime}.
            </p>

            <div className="agent-box">
              <h3>Your Assigned Tour Agent</h3>
              <div className="agent-details">
                <p><strong>Name:</strong> {assignedAgent.name}</p>
                <p><strong>Phone:</strong> {assignedAgent.phone}</p>
                <p><strong>Email:</strong> {assignedAgent.email}</p>
              </div>
              <p className="agent-message">Your agent will contact you within 24 hours to finalize all details.</p>
            </div>

            <div className="summary-box">
              <h3>Booking Summary</h3>
              <p><strong>Sites:</strong> {selectedSitesData.map(s => s.name).join(", ")}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.startTime} - {formData.endTime}</p>
              <p><strong>Guests:</strong> {formData.guests}</p>
              <p className="total-amount"><strong>Total Paid:</strong> Rs. {prices.total.toFixed(0)}</p>
            </div>

            <button onClick={() => navigate("/city-selection")} className="btn-home">Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-booking-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/lahore-sites")}>← Back</button>
        <h1>Book Your Tour</h1>
      </div>
      <div className="booking-container">
        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-box">{error}</div>}

          {/* Personal Information */}
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your full name"/>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="your.email@example.com"/>
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+92 300 1234567"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tour Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required min={new Date().toISOString().split('T')[0]}/>
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} min="1" max="20"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Time *</label>
                <select name="startTime" value={formData.startTime} onChange={handleInputChange} required>
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>End Time *</label>
                <select name="endTime" value={formData.endTime} onChange={handleInputChange} required>
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>
            <p className="help-text">Select the time range for your tour. Your agent will be booked for this entire duration.</p>
          </div>

          {/* Professional Site Selection */}
          <div className="form-section">
            <h2>Select Sites to Visit *</h2>
            <div className="sites-grid">
              {allSites.map(site => (
                <label key={site.id} className="site-card">
                  <input
                    type="checkbox"
                    value={site.id}
                    checked={formData.sites.includes(site.id)}
                    onChange={(e) => {
                      const selected = [...formData.sites];
                      if (e.target.checked) selected.push(site.id);
                      else selected.splice(selected.indexOf(site.id), 1);
                      setFormData(prev => ({ ...prev, sites: selected }));
                    }}
                  />
                  <div className="site-info">
                    <span className="site-name">{site.name}</span>
                    <span className="site-fee">{site.fee > 0 ? `Rs. ${site.fee}` : "Free"}</span>
                  </div>
                </label>
              ))}
            </div>
            <p className="help-text">
              Selected: {selectedSitesData.length} site(s)
              {selectedSitesData.length > 0 && ` - ${selectedSitesData.map(s => s.name).join(", ")}`}
            </p>
          </div>

          {/* Tour Package, Transport, Payment, Summary */}
          <div className="form-section">
            <h2>Tour Package</h2>
            <select name="tourPackage" value={formData.tourPackage} onChange={handleInputChange} required>
              <option value="basic">Basic Tour - Rs. 2,000 (Guide only)</option>
              <option value="standard">Standard Tour - Rs. 3,500 (Guide + Refreshments)</option>
              <option value="premium">Premium Tour - Rs. 5,500 (Expert Guide + Full Meal + Photos)</option>
            </select>
          </div>
          <div className="form-section">
            <h2>Transportation</h2>
            <select name="transport" value={formData.transport} onChange={handleInputChange} required>
              <option value="none">No Transport - Rs. 0</option>
              <option value="rickshaw">Rickshaw - Rs. 1,500</option>
              <option value="car">Car/Sedan - Rs. 3,000</option>
              <option value="van">Van - Rs. 5,000</option>
            </select>
          </div>
          <div className="form-section">
            <h2>Payment Plan</h2>
            <select name="paymentPlan" value={formData.paymentPlan} onChange={handleInputChange} required>
              <option value="full">Full Payment (10% Discount)</option>
              <option value="advance">50% Advance Payment</option>
              <option value="venue">Pay at Venue</option>
            </select>
          </div>

          <div className="price-summary">
            <h2>Price Summary</h2>
            <div className="summary-row"><span>Entry Fees ({selectedSitesData.length} sites):</span><span>Rs. {prices.sitesFee}</span></div>
            <div className="summary-row"><span>Tour Package:</span><span>Rs. {prices.packageFee}</span></div>
            <div className="summary-row"><span>Transportation:</span><span>Rs. {prices.transportFee}</span></div>
            <div className="summary-row subtotal"><span>Subtotal:</span><span>Rs. {prices.subtotal}</span></div>
            {prices.discount > 0 && <div className="summary-row discount"><span>Discount (10%):</span><span>- Rs. {prices.discount.toFixed(0)}</span></div>}
            <div className="summary-row total"><span>Total Amount:</span><span>Rs. {prices.total.toFixed(0)}</span></div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>{loading ? "Processing..." : "Confirm Booking"}</button>
        </form>
      </div>
    </div>
  );
}