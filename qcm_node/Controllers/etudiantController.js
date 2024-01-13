const Etudiant = require('../models/Etudiant'); // Adjust path as necessary
const bcrypt = require('bcryptjs'); // For password hashing


async function etudiantRegister(req, res) {
  try {
      // Extracting the user details from the request body
      const { nom, prenom, email, password } = req.body;

      // Check if the user already exists
      let etudiant = await Etudiant.findOne({ email });
      if (etudiant) {
        res.status(400).json({ message: 'Etudiant already exists' });

      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new Etudiant
      etudiant = new Etudiant({
          nom,
          prenom,
          email,
          password: hashedPassword
      });

      // Save the Etudiant
      await etudiant.save();

      res.status(200).json({ message: 'Etudiant Registered Successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  etudiantRegister,
  // other exports here
};
