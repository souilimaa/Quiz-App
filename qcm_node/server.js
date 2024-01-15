const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require('cors');
const questionRoutes = require('./Routes/questionRoutes');

const professeurRoutes = require('./Routes/professeurRoutes'); // Import the correct module
const etudiantRoutes = require('./Routes/etudiantRoutes');
const matiereRoutes = require('./Routes/matiereRoutes');
const choicesRoutes = require('./Routes/choicesRoutes');
const EtudiantAnswer=require('./Routes/EtudiantAnswer')
const qcmRouter=require('./Routes/qcmRouter')

const app = express();

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());

const uri = "mongodb://localhost:27017/qcm";

// Database connection function
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
app.use('/QCM',qcmRouter);
app.use('/matieres', matiereRoutes);
app.use('/QCM', matiereRoutes);
app.use('/Question', questionRoutes); // Adjust the base path if needed
app.use('/choices', choicesRoutes);
app.use('/Answers',EtudiantAnswer)

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
