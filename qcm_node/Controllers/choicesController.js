// choicesController.js

const ChoixModel = require('../models/Choix');

const addChoice = async (req, res) => {
    try {
        const newChoice = new ChoixModel(req.body);
        await newChoice.save();
        res.status(201).json(newChoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getChoicesForQuestion = async (req, res) => {
    try {
        const choices = await ChoixModel.find({ idQuestion: req.params.questionId });
        res.status(200).json(choices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addChoice, getChoicesForQuestion };
