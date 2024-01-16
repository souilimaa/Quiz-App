import React from 'react';
import NavbarAdmin from '../Component/NavbarAdmin';

const AdminDashboard = () => {
  const storedData = localStorage.getItem('userData');
  let userId; 

  if (storedData) {
    const userData = JSON.parse(storedData);
    userId = userData.userId; 
    console.log('User ID:', userId);
  } else {
    console.log('No user data found in localStorage');
  }

  return (
    <div>
      <NavbarAdmin userId={userId} />
      <h2>Quiz Dashboard</h2>
    </div>
  );
};

export default AdminDashboard;
