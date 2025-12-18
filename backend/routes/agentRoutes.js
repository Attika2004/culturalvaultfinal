const express = require("express");
const router = express.Router();
const {
  loginAgent,
  getAgentBookings,
  getAllAgents
} = require("../controllers/agentController");

// Agent login
router.post("/login", loginAgent);

// Get agent's bookings
router.get("/:agentId/bookings", getAgentBookings);

// Get all agents (for admin)
router.get("/", getAllAgents);

module.exports = router;