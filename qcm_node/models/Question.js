const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  idQcm: { type: mongoose.Schema.Types.ObjectId, ref: 'QCM', required: true },
  ennonce: { type: String, required: true },
});

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;
