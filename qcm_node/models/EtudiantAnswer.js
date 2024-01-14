const mongoose = require('mongoose');

const etudiantAnswerSchema = new mongoose.Schema({
  idEtudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant', required: true },
  idQCM: { type: mongoose.Schema.Types.ObjectId, ref: 'QCM', required: true },
  score: { type: Number,required:true},
});

const EtudiantAnswerModel = mongoose.model('EtudiantAnswer', etudiantAnswerSchema);

module.exports = EtudiantAnswerModel;