const EtudiantAnswerModel=require('../models/EtudiantAnswer')
exports.insertEtudiantAnswer = (req, res) => {
    EtudiantAnswerModel.create({
      idEtudiant: req.body.etudiantId,
      idQCM: req.body.qcmId,
      score: req.body.score
    })
    .then(result => {
      res.json({ state: "success" });
    })
    .catch(err => {
      res.status(500).json({ state: "failed",err:err });
    });
  };
  