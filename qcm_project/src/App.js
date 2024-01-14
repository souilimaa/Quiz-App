import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import AdminDashboard from './Component/AdminDashboard';
import UserHome from './Component/UserHome ';
import AddQuiz from './Component/AddQuiz';
import EtudiantRegistration from './Component/EtudiantRegistration';

=======
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 1211fc79a06866165f963cc7f9dec9b1293b6902

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Component/Login';
// import AdminDashboard from './Component/AdminDashboard';
// import UserHome from './Component/UserHome ';
// import EtudiantRegistration from './Component/EtudiantRegistration'
import EtudiantHome from './Component/EtudiantHome';
import QcmRoutes from './routes/qcmRoutes';
function App() {
  return (
    <Router>
      <div>
        {/* Your navigation here (e.g., <NavBar />) */}

        <Routes>
          <Route path="/Register" element={<EtudiantRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/add-quiz" element={<AddQuiz/>} />
          <Route path="/list-of-quizzes" />
          <Route path="/logout" />
           
          {/* Redirect or show a default route */}
          <Route path="/" element={<div>Welcome to the App</div>} />
        </Routes>
      </div>

    </Router>
        
    
 

  );
}
export default App;
