import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, VStack, useToast, Text } from '@chakra-ui/react';
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
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', emailId: '', mobileNumber: '' };

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (formData.emailId.trim() === '') {
      newErrors.emailId = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email address';
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
      const response = await axios.post('http://localhost:8082/admins/register', formData);

      if (response.status === 200) {
        setRegistrationStatus(true);
        console.log('Admin registered successfully');
        setFormData({
          name: '',
          emailId: '',
          mobileNumber: '',
        });
        alert('Registration successful! Press OK to proceed to OTP page.');
        navigate(`/admin/otp?email=${formData.emailId}`);
      } else {
        setRegistrationStatus(false);
        console.error('Failed to register Admin');
      }
    } catch (error) {
      setRegistrationStatus(false);
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
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

      <VStack spacing={4}>
        <Heading as="h2" size="lg">
          Admin Registration
        </Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          <Text color="red.500">{errors.name}</Text>
        </FormControl>
        <FormControl id="emailId">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
          <Text color="red.500">{errors.emailId}</Text>
        
        </FormControl>
        <FormControl id="mobileNumber">
          <FormLabel>Mobile Number</FormLabel>
          <Input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          <Text color="red.500">{errors.mobileNumber}</Text>
          
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
