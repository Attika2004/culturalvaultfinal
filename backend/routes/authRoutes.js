const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', registerUser);  // ← Changed from '/register' to '/signup'
router.post('/login', loginUser);

module.exports = router;