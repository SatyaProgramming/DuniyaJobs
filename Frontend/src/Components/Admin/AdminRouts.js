import React from 'react'
import Register from './Register'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Otp from './Otp';
const AdminRouts = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                ></Route>
                <Route
                    path="/register"
                    element={<Register />}
                ></Route>
                <Route
                    path="/otp"
                    element={<Otp />}
                ></Route>
            </Routes>
        </div>
    )
}

export default AdminRouts
