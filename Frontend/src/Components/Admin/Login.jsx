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

const Login = () => {
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
    <Container>
      <Box p={4}>
        <Heading as="h2" size="xl" mb={4}>
          Company Login
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
            <FormLabel>Contact Email</FormLabel>
            <Input type="email" name="contactEmail" value={companyLogin.contactEmail} onChange={handleChange} />
            <FormErrorMessage>{formErrors.contactEmail}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={companyLogin.password} onChange={handleChange} />
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;


