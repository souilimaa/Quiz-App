const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const etudiantController = require('../Controllers/etudiantController')

// Etudiant-specific routes
router.post('/etudiant/register', etudiantController.etudiantRegister);
// router.get('/etudiant/action', etudiantController.etudiantAction);
// Add more Etudiant routes as needed

// Unified login route
router.post('/login', authController.loginUser);

module.exports = router;
