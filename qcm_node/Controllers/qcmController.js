const QCMModel = require('../models/QCM'); // Make sure the path is correct

const createQCM = async (req, res) => {
  try {
    const {
      professeurId,
      titre,
      matiereId,
      description,
      duree,
      nombreQst,
      choixMultiple
    } = req.body;

    // Validate the request data here if needed

    const newQCM = new QCMModel({
      professeurId,
      titre,
      matiereId,
      description,
      duree,
      nombreQst,
      choixMultiple
    });

    const savedQCM = await newQCM.save();

    res.status(201).json(savedQCM);
  } catch (error) {
    console.error('Error creating QCM:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createQCM
};
