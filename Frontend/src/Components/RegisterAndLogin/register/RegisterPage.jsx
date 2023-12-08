// RegistrationForm.js
import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, VStack, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// ... (imports)

const RegisterPage = () => {
	const [formData, setFormData] = useState({
	  name: '',
	  emailId: '',
	  mobileNumber: '',
	});
  
	const [registrationStatus, setRegistrationStatus] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
	  setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
  
	  setLoading(true);
  
	  try {
		const response = await axios.post('http://localhost:8081/register', formData);
  
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
		  <FormControl>
			<FormLabel>Name</FormLabel>
			<Input type="text" name="name" value={formData.name} onChange={handleChange} />
		  </FormControl>
		  <FormControl>
			<FormLabel>Email</FormLabel>
			<Input type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
		  </FormControl>
		  <FormControl>
			<FormLabel>Mobile Number</FormLabel>
			<Input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
		  </FormControl>
		  <Button colorScheme="teal" onClick={handleSubmit} isLoading={loading}>
			Register
		  </Button>
		</VStack>
	  </Box>
	);
  };
  
  export default RegisterPage;
  