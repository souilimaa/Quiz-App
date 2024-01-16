const Professeur = require('../models/Professeur');

async function ProfesseurAction(req, res) {
  res.send('Admin Action');
}

module.exports = {
  ProfesseurAction,
};
