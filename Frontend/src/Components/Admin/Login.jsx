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
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const validateForm = () => {
    const errors = {};

    if (!login.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!login.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8082/admins/login', login);
        console.log('Server Response:', response.data);
        setIsLoginSuccess(true);
        setLoginError(null);
        sessionStorage.setItem('id', response.data.id);
        // Use navigate to redirect upon successful login
        navigate('/admin/home');
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
          <FormControl mb={4} isInvalid={!!formErrors.email}>
            <FormLabel>Contact Email</FormLabel>
            <Input type="email" name="email" value={login.email} onChange={handleChange} />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={login.password} onChange={handleChange} />
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


