const Matiere = require('../models/Matiere');

// Get all matieres
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.find();
    res.json(matieres);
  } catch (error) {
    console.error('Error fetching matieres:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new matiere
const createMatiere = async (req, res) => {
  const { nom } = req.body;

  try {
    const existingMatiere = await Matiere.findOne({ nom });

    if (existingMatiere) {
      return res.status(400).json({ message: 'Matiere with this name already exists' });
    }

    const newMatiere = new Matiere({ nom });
    const savedMatiere = await newMatiere.save();

    res.json(savedMatiere);
  } catch (error) {
    console.error('Error creating matiere:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMatieres=(req,res)=>{
  Matiere.find({})
  .then(matieres=>{
      res.json({state:"success",data:matieres})
  })
  .catch(err=>{
      res.json({state:"failed",data:[]})
  })
}

module.exports = {
  getMatieres,
  getAllMatieres,
  createMatiere,
};
