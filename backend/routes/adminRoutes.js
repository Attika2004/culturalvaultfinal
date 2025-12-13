const express = require('express');
const { getAllUsers, getAllBookings } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);

module.exports = router;
