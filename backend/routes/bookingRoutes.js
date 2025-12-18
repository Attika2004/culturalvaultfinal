const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getAllBookings, 
  getBookingsByEmail,
  getBookingById,
  updateBookingStatus,
  updateBooking,
  deleteBooking
} = require("../controllers/bookingController");

// Test route - Check if API is working
router.get("/", (req, res) => {
  res.json({ 
    message: "Booking API is working", 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// ============================================
// READ OPERATIONS
// ============================================

// Get all bookings (for admin)
router.get("/all", getAllBookings);

// Get single booking by ID
router.get("/:id", getBookingById);

// Get bookings by email (for user)
router.get("/email/:email", getBookingsByEmail);

// ============================================
// CREATE OPERATIONS
// ============================================

// Create new booking
router.post("/", createBooking);

// ============================================
// UPDATE OPERATIONS
// ============================================

// Update booking status only (quick update)
router.put("/:id/status", updateBookingStatus);

// Update entire booking (full update)
//router.put("/:id", updateBooking);

// ============================================
// DELETE OPERATIONS
// ============================================

// Delete booking
router.delete("/:id", deleteBooking);

module.exports = router;