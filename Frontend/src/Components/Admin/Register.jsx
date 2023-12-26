import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    emailId: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    console.log(formData);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.name.trim() === '') {
      newErrors.name = 'Company Name is required';
      isValid = false;
    }

    if (formData.emailId.trim() === '') {
      newErrors.emailId = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email address';
      isValid = false;
    }

    if (formData.mobileNumber.trim() === '') {
      newErrors.mobileNumber = 'Mobile Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number (10 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Sending data:', formData); // Add this line for debugging
      const response = await axios.post(
        'http://localhost:8082/admins/register',
        formData
      );
  
      console.log('Response:', response.data); // Add this line for debugging
  
      if (response.status === 200) {
        setRegistrationStatus(true);
        console.log('User registered successfully');
        setFormData({
          name: '',
          emailId: '',
          mobileNumber: '',
        });
        alert('Registration successful! Press OK to proceed to OTP page.');
        navigate(`/otp?email=${formData.emailId}`);
      } else {
        setRegistrationStatus(false);
        console.error('Failed to register user');
      }
    } catch (error) {
      setRegistrationStatus(false);
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box>
      {registrationStatus === true && (
        <Text color="green.500" mb="4">
          Registration successful! Check your email for the OTP.
        </Text>
      )}
      {registrationStatus === false && (
        <Text color="red.500" mb="4">
          Registration failed. Please try again.
        </Text>
      )}

      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={errors.companyName !== ''}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Text color="red.500">{errors.companyName}</Text>
        </FormControl>
        <FormControl isInvalid={errors.contactEmail !== ''}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          <Text color="red.500">{errors.contactEmail}</Text>
        </FormControl>
        <FormControl isInvalid={errors.mobileNumber !== ''}>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <Text color="red.500">{errors.mobileNumber}</Text>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit} isLoading={loading}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
