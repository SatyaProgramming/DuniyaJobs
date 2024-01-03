// Login.js
import React from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Replace this with your actual login logic, e.g., API request
    login();
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
