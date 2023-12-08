import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    password: '',
    location: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    industry: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  

  const onClose = () => {
    setIsOpen(false);
    // Reset the form and errors after closing the alert
    setFormData({
      companyName: '',
      
      password: '',
      location: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      industry: '',
    });
    setFormErrors({});
    if (isSuccess) {
      navigate('/employer-otp'); // Replace '/otp-page' with the actual path you want to redirect to
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Example: Validate that companyName is not empty
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company Name is required';
    }

    // Add other validation rules for each form field as needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleRegistration = async () => {
    if (validateForm()) {
      try {
        // Assuming your backend endpoint is /api/company/employer-register
        const response = await axios.post('http://localhost:8081/employer-register', formData);

        // Handle the response accordingly (e.g., show success message, redirect, etc.)
        console.log('Server Response:', response.data);
        setIsSuccess(true);
        setIsOpen(true);
      } catch (error) {
        // Handle errors (e.g., show error message)
        console.error('Error:', error.message);
        setIsSuccess(false);
        setIsOpen(true);
      }
    }
  };

  return (
    <Container>
      <Box boxShadow='md' p='6' rounded='md' >
        <Heading as="h2" size="lg" mb={4}>
          Company Registration Form
        </Heading>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl mb={4} isInvalid={!!formErrors.companyName}>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <FormErrorMessage>{formErrors.companyName}</FormErrorMessage>
          </FormControl>

             
              <FormControl mb={4} isInvalid={!!formErrors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.location}>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.location}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.contactPerson}>
                <FormLabel>Contact Person</FormLabel>
                <Input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.contactPerson}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.contactEmail}>
                <FormLabel>Contact Email</FormLabel>
                <Input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.contactEmail}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.contactPhone}>
                <FormLabel>Contact Phone</FormLabel>
                <Input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.contactPhone}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.description}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formErrors.industry}>
                <FormLabel>Industry</FormLabel>
                <Input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
                <FormErrorMessage>{formErrors.industry}</FormErrorMessage>
            
          
              </FormControl>
          <Button type="submit" colorScheme="teal" mt={4} onClick={handleRegistration}>
            Register Company
          </Button>
        </form>

        {/* Alert Dialog for Success or Failure */}
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {isSuccess ? 'Registration Successful' : 'Registration Failed'}
              </AlertDialogHeader>

              <AlertDialogBody>
                {isSuccess
                  ? 'Your company has been registered successfully!'
                  : 'There was an error during registration. Please try again.'}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="teal" onClick={onClose}>
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Container>
  );
};

export default CompanyRegisterForm;
