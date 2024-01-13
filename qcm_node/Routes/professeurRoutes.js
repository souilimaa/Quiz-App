const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const professeurController = require('../Controllers/professeurController');

// Admin-specific routes
// router.get('/admin/action', professeurController.adminAction);
// // Add more Admin routes as needed

// Unified login route
router.post('/login', authController.loginUser);

module.exports = router;
