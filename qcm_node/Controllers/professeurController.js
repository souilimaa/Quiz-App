const Professeur = require('../models/Professeur');

async function ProfesseurAction(req, res) {
  // Admin-specific logic here
  res.send('Admin Action');
}

module.exports = {
  ProfesseurAction,
};
