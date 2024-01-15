import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import AdminDashboard from './Component/AdminDashboard';
import UserHome from './Component/UserHome ';
import AddQuiz from './Component/AddQuiz';
import EtudiantRegistration from './Component/EtudiantRegistration';
import EtudiantHome from './Component/EtudiantHome';
import Listquize from './Component/ListQuize'
import QcmDetails from './Component/QcmDetails'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Register" element={<EtudiantRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-home" element={<EtudiantHome/>}/>
          <Route path="/add-quiz" element={<AddQuiz/>} />
          <Route path="/list-of-quizzes"  element={<Listquize/>}/>
          <Route path="/logout" />
          <Route path="/qcmdetails/:qcmId" element={<QcmDetails/>} />

          
           
          {/* Redirect or show a default route */}
          <Route path="/" element={<div>Welcome to the App</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
