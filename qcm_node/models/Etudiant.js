const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EtudiantSchema = new Schema({
  nom: String,
  prenom: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Enable timestamps
});

const Etudiant = mongoose.model('Etudiant', EtudiantSchema);

module.exports = Etudiant;
