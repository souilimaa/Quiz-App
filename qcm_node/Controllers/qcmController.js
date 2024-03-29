const mongoose = require('mongoose');
const QCMModel = require('../models/QCM');
const MatiereModel = require('../models/Matiere');
const QuestionModel = require('../models/Question');
const ChoixModel = require('../models/Choix');

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

const getQcmsByMatiereId = (req, res) => {
  QCMModel.find({ matiereId: req.params.id })
    .then((qcms) => {
      res.json({ state: "success", data: qcms });
    })
    .catch((err) => {
      res.json({ state: "failed", error: err, qcms: [] });
    });
};

const getQcmsById = (req, res) => {
  QCMModel.find({ _id: req.params.id })
    .then((qcm) => {
      res.json({ state: "success", qcm: qcm });
    })
    .catch(err => {
      res.json({ state: "failed", qcm: "" });
    });
};

const createQCM = async (req, res) => {
  try {
    const { professeurId, titre, matiereId, description, duree, nombreQst, choixMultiple } = req.body;


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

const getQuizzesByMatiere = async (req, res) => {
  try {
    const matiereId = req.params.matiereId;
    const qcms = await QCMModel.find({ matiereId: matiereId });
    res.json(qcms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  getQcms,
  getQcmsByMatiereId,
  getQcmsById,
  createQCM,
  getQuizzesByMatiere,
  getQcmById,
  deleteQCM,
};
