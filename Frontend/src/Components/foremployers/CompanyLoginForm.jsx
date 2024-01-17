import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import style from "./FormStyling.module.css";
import EarthLogo from "../Assets/EarthLogo.gif"
import Footer from "../HomePageFooter/Footer";

const CompanyLoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [companyLogin, setCompanyLogin] = useState({
    contactEmail: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const validateForm = () => {
    const errors = {};

    if (!companyLogin.contactEmail.trim()) {
      errors.contactEmail = 'Email is required';
    }

    if (!companyLogin.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/company-login', companyLogin);
        console.log('Server Response:', response.data);
        setIsLoginSuccess(true);
        setLoginError(null);
        sessionStorage.setItem('companyId', response.data.srno);
        // Use navigate to redirect upon successful login
        navigate('/company-home');
      } catch (error) {
        console.error('Error:', error.message);
        setIsLoginSuccess(false);
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className={style.LoginContainer}>
        <Container m={5} textAlign="center" border="solid 2px #f2f2f2" borderRadius="15px" backgroundColor="#f2f2f26d">
          <h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1>
          <Box p={4}>
            <Heading as="h2" size="xl" mb={4}>
              Employer Login
            </Heading>
            {loginError && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {loginError}
              </Alert>
            )}
            {isLoginSuccess && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                Login successful!
              </Alert>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl mb={4} isInvalid={!!formErrors.contactEmail}>
                <FormLabel fontSize="20px">Contact Email</FormLabel>
                <Input fontSize="22px" p={2} type="email" name="contactEmail" value={companyLogin.contactEmail} onChange={handleChange} />
                <FormErrorMessage>{formErrors.contactEmail}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.password}>
                <FormLabel fontSize="20px">Password</FormLabel>
                <Input fontSize="22px" p={2} type="password" name="password" value={companyLogin.password} onChange={handleChange} />
                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              </FormControl>

              <Button className={style.LoginBtn} fontSize="20px" p={5} backgroundColor="#2870C1" type="submit" colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>


  );
};

export default CompanyLoginForm;
