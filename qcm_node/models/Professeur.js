const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professeurSchema = new Schema({
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



const Professeur = mongoose.model('Professeur', professeurSchema);

module.exports =  Professeur ;
