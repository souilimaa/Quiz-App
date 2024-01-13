import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import AdminDashboard from './Component/AdminDashboard';
import UserHome from './Component/UserHome ';
import EtudiantRegistration from './Component/EtudiantRegistration'

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
          {/* Redirect or show a default route */}
          <Route path="/" element={<div>Welcome to the App</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
