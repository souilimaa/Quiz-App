const mongoose = require('mongoose');

const choixSchema = new mongoose.Schema({
  idQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  // idQCM: { type: mongoose.Schema.Types.ObjectId, ref: 'QCM', required: true },
  choixEnonce: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const ChoixModel = mongoose.model('Choix', choixSchema);

module.exports = ChoixModel;
