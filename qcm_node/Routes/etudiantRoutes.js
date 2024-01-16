const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const etudiantController = require('../Controllers/etudiantController')

router.post('/etudiant/register', etudiantController.etudiantRegister);

router.post('/login', authController.loginUser);

module.exports = router;
