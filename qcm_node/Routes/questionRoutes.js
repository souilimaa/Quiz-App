const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/questionController');

// Route to add a new question
router.post('/add', questionController.addQuestion);

module.exports = router;
