import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavbarAdmin.css'
const NavbarAdmin = ({ userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions if needed (e.g., clear user session)
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar-admin">
      <div className="nav-item">
        <Link to={`/add-quiz?userId=${userId}`}>Add Quiz</Link>
      </div>
      <div className="nav-item">
        <Link to={`/list-of-quizzes?userId=${userId}`}>List of Quizzes</Link>
      </div>
      <div className="nav-item">
        <Link to={`/Results`}>Quizzes Results</Link>
      </div>

      <div className="nav-item">
        <span onClick={handleLogout} className="nav-item" >
          Logout
        </span>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
