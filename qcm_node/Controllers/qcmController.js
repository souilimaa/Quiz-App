const mongoose=require('mongoose')
const QCMModel=require('../models/QCM')

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
const getQcms = (req, res) => {
  QCMModel.find({})
    .then((qcms) => {
      res.json({ state: "success", data: qcms });
    })
    .catch((err) => {
      console.log(err);
      res.json({ state: "failed", error: err, qcms: [] });
    });
};
 
const getQuizzesByMatiere = async (req, res) => {
  try {
    const matiereId = req.params.matiereId;
    const qcms = await QCMModel.find({ matiereId: matiereId });
    res.json(qcms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getQcmById = async (req, res) => {
  try {
    const { qcmId } = req.params;

    const qcm = await QCMModel.findById(qcmId);
    if (!qcm) {
      return res.status(404).json({ error: 'QCM not found' });
    }

    // Send the QCM details as a JSON response
    res.json(qcm);
  } catch (error) {
    console.error('Error fetching QCM details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createQCM,
  getQcms,
  getQcmById,
  getQuizzesByMatiere,
};