
// RegisterPage.js
import React, { useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "./../../../config/userConfig";
import style from "./Register.module.css";
import FormStyling from "../../foremployers/FormStyling.module.css";
import EarthLogo from "../../Assets/EarthLogo.gif"
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Container,
  Heading
} from '@chakra-ui/react';
import Footer from '../../HomePageFooter/Footer';
import UniversalNavBar from "../../LandingPage/UniversalNavBar"

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
      // Display error message next to the form field
      dispatch({ type: 'SET_ERRORS', errors: { [error.field]: error.message } });
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
      <UniversalNavBar/>
      <div className={FormStyling.LoginContainer}>
        <Container p={5} textAlign="center" border="solid 2px #f2f2f2" borderRadius="15px" backgroundColor="#f2f2f26d">
          <h1 className={FormStyling.landingLogo}><span className={FormStyling.dLogo}>D</span>uniya J<span className={FormStyling.oLogo}><img src={EarthLogo} alt="" className={FormStyling.earthLogo} /></span>bs</h1>
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Employee Registration
            </Heading>
            <VStack spacing={4} align="stretch">
              <div className={style['register-container']}>
                {state.registrationStatus !== null && (
                  <p className={`${style['status-message']} ${state.registrationStatus ? style.success : style.failure}`}>
                    {state.registrationStatus
                      ? 'Registration successful! Check your email for the OTP.'
                      : 'Registration failed. Please try again.'}
                  </p>
                )}

                <div className={style['form-container']}>
                  {['Name', 'emailId', 'Mobile Number'].map((field) => (
                    <div key={field} className={style['form-control']}>
                      <FormLabel fontSize="20px" className={style.label}>{field === 'emailId' ? 'Email' : field}</FormLabel>
                      <Input fontSize="22px" className={style.InputBx} type={field === 'emailId' ? 'email' : 'text'} name={field} value={state[field]} onChange={handleChange} />
                      <span className={style['error-message']}>{state.errors[field]}</span>
                    </div>
                  ))}
                  <Button className={FormStyling.LoginBtn} fontSize="20px" p={5} backgroundColor="#2870C1" colorScheme="teal" onClick={handleSubmit} disabled={state.loading}>
                    {state.loading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </div>
            </VStack>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
