const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');

const cors = require('cors');
<<<<<<< HEAD
const professeurRoutes = require('./Routes/professeurRoutes'); 
const etudiantRoutes = require('./Routes/etudiantRoutes');
const QuestionRouter = require('./Routes/questionRouter');
const qcmRouter = require('./Routes/qcmRouter');
const matiereRouter = require('./Routes/matiereRouter');
const choixRouter = require('./Routes/choixRouter');
const etudiantAnswerRouter = require('./Routes/etudiantAnswerRouter');
=======
const questionRoutes = require('./Routes/questionRoutes');

const professeurRoutes = require('./Routes/professeurRoutes'); // Import the correct module
const etudiantRoutes = require('./Routes/etudiantRoutes');
const matiereRoutes = require('./Routes/matiereRoutes');
const choicesRoutes = require('./Routes/choicesRoutes');
const EtudiantAnswer=require('./Routes/EtudiantAnswer')
const qcmRouter=require('./Routes/qcmRouter')
>>>>>>> df663c6d4e5e17cf61b09a439b5b5e58a59f43e7

const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/qcm";

const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to db ....");
  } catch (err) {
    console.error(err);
  }
};
dbConnect();

app.use('/', professeurRoutes);
app.use('/', etudiantRoutes);
<<<<<<< HEAD
app.use('/QCM', qcmRouter);
app.use('/Matiere', matiereRouter);
app.use('/Quiz/questions', QuestionRouter);
app.use('/quiz/choices', choixRouter);
app.use('/Answer', etudiantAnswerRouter);
=======
app.use('/QCM',qcmRouter);
app.use('/matieres', matiereRoutes);
app.use('/QCM', matiereRoutes);
app.use('/Question', questionRoutes); // Adjust the base path if needed
app.use('/choices', choicesRoutes);
app.use('/Answers',EtudiantAnswer)
>>>>>>> df663c6d4e5e17cf61b09a439b5b5e58a59f43e7

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
