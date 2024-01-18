const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require('cors');
const QuestionRouter = require('./Routes/questionRouter');
const matiereRouter = require('./Routes/matiereRouter');
const choixRouter = require('./Routes/choixRouter');
const etudiantAnswerRouter = require('./Routes/etudiantAnswerRouter');
const professeurRoutes = require('./Routes/professeurRoutes'); 
const etudiantRoutes = require('./Routes/etudiantRoutes');
const qcmRouter=require('./Routes/qcmRouter')

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
app.use('/quiz/choices', choixRouter);
app.use('/Answer', etudiantAnswerRouter);
app.use('/QCM', qcmRouter);
app.use('/Quiz/questions', QuestionRouter);
app.use('/Matiere', matiereRouter);
app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
