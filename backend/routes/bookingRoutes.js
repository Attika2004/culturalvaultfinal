/*const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Route working");
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings, getBookingsByEmail } = require("../controllers/bookingController");

// Test route
router.get("/", (req, res) => {
    res.json({ message: "Booking API is working", status: "OK" });
});

// Get all bookings
router.get("/all", getAllBookings);

// Get bookings by email
router.get("/email/:email", getBookingsByEmail);

// Create booking route
router.post("/", createBooking);

module.exports = router;