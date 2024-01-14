import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  return (
    <div>
      <h2>Quiz Dashboard</h2>
      <Link to={`/add-quiz?userId=${userId}`}>Add Quiz</Link>
      <Link to="/list-of-quizzes">List of Quizzes</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default AdminDashboard;
