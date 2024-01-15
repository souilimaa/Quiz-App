 const mongoose=require('mongoose')
const QCMModel=require('../models/QCM')
const QuestionModel = require('../models/Question');
const ChoixModel = require('../models/Choix');

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
const deleteQCM = async (req, res) => {
  try {
      const qcmId = req.params.qcmId;
      
      // Delete Choices linked to Questions of this QCM
      await ChoixModel.deleteMany({ idQuestion: { $in: (await QuestionModel.find({ idQcm: qcmId })).map(q => q._id) } });

      // Delete Questions linked to this QCM
      await QuestionModel.deleteMany({ idQcm: qcmId });

      // Delete the QCM
      await QCMModel.findByIdAndDelete(qcmId);

      res.status(200).send({ message: 'QCM and related data deleted successfully' });
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};


module.exports = {
  deleteQCM,
  createQCM,
  getQcms,
  getQcmById,
  getQuizzesByMatiere,
};