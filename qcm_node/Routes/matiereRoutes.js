const express = require('express');
const router = express.Router();
const matiereController = require('../Controllers/matiereController');

// GET all matieres
router.get('/', matiereController.getAllMatieres);

// POST create a new matiere
router.post('/create', matiereController.createMatiere);

module.exports = router;
