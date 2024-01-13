const mongoose = require('mongoose');

const matiereSchema = new mongoose.Schema({
  nom: { type: String, required: true },
});

const MatiereModel = mongoose.model('Matiere', matiereSchema);

module.exports = MatiereModel;