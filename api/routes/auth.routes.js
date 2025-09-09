const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

router.post('/register', registerUser); // New route for creating users
router.post('/login', loginUser);     // Existing route, now using new logic

module.exports = router;