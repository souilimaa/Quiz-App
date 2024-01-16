const mongoose = require('mongoose');
const ChoixModel = require('../models/Choix');

exports.getChoixByQuestionId = (req, res) => {
    ChoixModel.find({ idQuestion: req.params.questionId })
        .then((choixes) => {
            res.json({ state: "success", choixes: choixes });
        })
        .catch((err) => {
            res.json({ state: "failed", error: err, choixes: [] });
        });
};

exports.addChoice = async (req, res) => {
    try {
        const newChoice = new ChoixModel(req.body);
        await newChoice.save();
        res.status(201).json(newChoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getChoicesForQuestion = async (req, res) => {
    try {
        const choices = await ChoixModel.find({ idQuestion: req.params.questionId });
        res.status(200).json(choices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
