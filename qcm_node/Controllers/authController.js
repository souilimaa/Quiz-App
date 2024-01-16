const Etudiant = require('../models/Etudiant');
const Professeur = require('../models/Professeur');
const bcrypt = require('bcryptjs'); 
const session = require('express-session');

async function loginUser(req, res) {
  const { email, password } = req.body;
  let user = await Professeur.findOne({ email }) || await Etudiant.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  req.session.user = { id: user._id, userType: user instanceof Professeur ? 'Professeur' : 'Etudiant' };

  res.json({ userType: req.session.user.userType,userId: user._id,  message: `Welcome ${req.session.user.userType}` });
}

module.exports = {
  loginUser,
};
