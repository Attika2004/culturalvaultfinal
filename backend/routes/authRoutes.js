const express = require('express');
const router = express.Router();

const { registerUser, loginUser, verifyToken } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/verify
router.get('/verify', verifyToken);

module.exports = router;