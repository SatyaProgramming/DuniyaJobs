import React from 'react';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Otp from './Otp';
import Home from './Home';

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
