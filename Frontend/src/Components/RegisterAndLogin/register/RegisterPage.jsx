// RegisterPage.js
import React, { useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "./../../../config/userConfig";
import style from "./Register.module.css";
import Navbar from '../../CommenNav/Navbar';


const initialState = {
  name: '',
  emailId: '',
  mobileNumber: '',
  registrationStatus: null,
  loading: false,
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_STATUS':
      return { ...state, registrationStatus: action.status };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

const RegisterPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', loading: true });

    try {
      // Client-side validation
      const errors = ['name', 'emailId', 'mobileNumber'].reduce((acc, field) => {
        if (!state[field]) acc[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        return acc;
      }, {});

      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', errors });
        throw new Error('Please fill in all required fields.');
      }

      const response = await axios.post(`${API_BASE_URL}/register`, state);

      if (response.status === 200) {
        dispatch({ type: 'SET_STATUS', status: true });
        console.log('User registered successfully');
        alert('Registration successful! Press OK to proceed to OTP page.');
        navigate(`/otp?email=${state.emailId}`);
      } else {
        dispatch({ type: 'SET_STATUS', status: false });
        console.error('Failed to register user');
      }
    } catch (error) {
      dispatch({ type: 'SET_STATUS', status: false });
      console.error('Error during registration:', error.message);
      // Display error message to the user
      alert(`Error during registration: ${error.message}`);
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Register', url: '/register' },
    { name: 'Login', url: '/login' },
    // Add more navigation items as needed
  ];

  return (
    <div>
      <Navbar navItems={navItems} />
      <div className={style['register-container']}>
        {state.registrationStatus !== null && (
          <p className={`${style['status-message']} ${state.registrationStatus ? style.success : style.failure}`}>
            {state.registrationStatus
              ? 'Registration successful! Check your email for the OTP.'
              : 'Registration failed. Please try again.'}
          </p>
        )}

        <div className={style['form-container']}>
          {['name', 'emailId', 'mobileNumber'].map((field) => (
            <div key={field} className={style['form-control']}>
              <label className={style.label}>{field === 'emailId' ? 'Email' : field}</label>
              <input className={style.InputBx} type={field === 'emailId' ? 'email' : 'text'} name={field} value={state[field]} onChange={handleChange} />
              <span className={style['error-message']}>{state.errors[field]}</span>
            </div>
          ))}
          <button className={style['submit-button']} onClick={handleSubmit} disabled={state.loading}>
            {state.loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
