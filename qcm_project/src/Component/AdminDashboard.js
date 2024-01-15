// AdminDashboard.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarAdmin from '../Component/NavbarAdmin';

const AdminDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  return (
    <div>
      <NavbarAdmin userId={userId} />
      <h2>Quiz Dashboard</h2>
    </div>
  );
};

export default AdminDashboard;
