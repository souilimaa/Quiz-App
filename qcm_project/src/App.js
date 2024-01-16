import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import AdminDashboard from './Component/AdminDashboard';
import AddQuiz from './Component/AddQuiz';
import EtudiantRegistration from './Component/EtudiantRegistration';
import EtudiantHome from './Component/EtudiantHome';
import Listquize from './Component/ListQuize'
import QcmDetails from './Component/QcmDetails'
import Results from './Component/Results'
import QcmRouter from './routes/qcmRoutes'
function App() {
  return (
    <Router>
      <QcmRouter/>
      <div>
        <Routes>
          <Route path="/Register" element={<EtudiantRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-quiz" element={<AddQuiz/>} />
          <Route path="/list-of-quizzes"  element={<Listquize/>}/>
          <Route path="/logout" />
          <Route path="/qcmdetails/:qcmId" element={<QcmDetails/>} />
          <Route path="/Results" element={<Results/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
