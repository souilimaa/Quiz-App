// choicesRoutes.js

const express = require('express');
const router = express.Router();
const choicesController = require('../Controllers/choicesController');

// POST route to add a new choice
router.post('/add', choicesController.addChoice);

// GET route to get choices for a specific question
router.get('/choices/:questionId', choicesController.getChoicesForQuestion);

// Add more routes as needed

module.exports = router;
