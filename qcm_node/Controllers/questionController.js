
const QuestionModel=require('../models/Question')
const mongoose=require('mongoose')



const addQuestion = async (req, res) => {
  try {
    const { idQcm, ennonce } = req.body;

    if (!mongoose.Types.ObjectId.isValid(idQcm)) {
      return res.status(400).json({ error: 'Invalid QCM ID' });
    }

    const newQuestion = new QuestionModel({
      idQcm,
      ennonce,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error adding question:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getQuestionsByQcmId = async (req, res) => {
  try {
    const qcmId = req.params.qcmId;
    const questions = await QuestionModel.find({ idQcm: qcmId });
    res.json(questions);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { 
  getQuestionsByQcmId,
  addQuestion,
};
