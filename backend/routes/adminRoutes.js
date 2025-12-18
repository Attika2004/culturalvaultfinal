const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getDashboardStats,
  getCities,
  addCity,
  editCity,
  deleteCity,
  getSites,
  addSite,
  editSite,
  deleteSite,
  getAgents,
  addAgent,
  updateAgent,
  deleteAgent,
  getAllUsers,
  getAllBookings
} = require("../controllers/adminController");

// 🔹 Multer setup for site images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// ===== DASHBOARD =====
router.get("/dashboard/stats", getDashboardStats);

// ===== CITIES =====
router.get("/cities", getCities);
router.post("/cities", addCity);
router.put("/cities/:id", editCity);
router.delete("/cities/:id", deleteCity);

// ===== SITES =====
router.get("/sites", getSites);
router.post("/sites", upload.single("MainImage"), addSite);
router.put("/sites/:id", upload.single("MainImage"), editSite);
router.delete("/sites/:id", deleteSite);

// ===== AGENTS =====
router.get("/agents", getAgents);
router.post("/agents", addAgent);
router.put("/agents/:id", updateAgent);
router.delete("/agents/:id", deleteAgent);

// ===== USERS & BOOKINGS =====
router.get("/users", getAllUsers);
router.get("/bookings", getAllBookings);

module.exports = router;
