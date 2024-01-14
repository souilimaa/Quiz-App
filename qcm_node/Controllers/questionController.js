const Question = require('../models/Question'); // Make sure to provide the correct path to your Question model
const mongoose=require('mongoose')
const addQuestion = async (req, res) => {
  try {
    const { idQcm, ennonce } = req.body;

    // Validate that idQcm is a valid ObjectId (if needed)
    if (!mongoose.Types.ObjectId.isValid(idQcm)) {
      return res.status(400).json({ error: 'Invalid QCM ID' });
    }

    // Create a new question instance
    const newQuestion = new Question({
      idQcm,
      ennonce,
    });

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    // You can handle additional logic or send a response as needed
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error adding question:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addQuestion,
};
