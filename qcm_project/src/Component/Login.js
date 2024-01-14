import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch('http://localhost:5000/login', config);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Login failed');
      }
      const responseData = await response.json();
      console.log("Response Data: ", responseData); // Log to check the response
      setUserId(responseData.userId);
      

      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(responseData));
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  // Use useEffect to handle redirection after state update
  useEffect(() => {
    // Redirect only after successful login, not on component mount
    if (userId) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData && userData.userId) {
          const redirectUrl = userData.userType === 'Professeur' ? '/admin-dashboard' : '/user-home';
          window.location.href = `${redirectUrl}?userId=${userData.userId}`;
        }
      }
    }
  }, [userId]);
  


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
