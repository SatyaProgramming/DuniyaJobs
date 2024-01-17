// RegistrationForm.js
import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
  Container,
  Heading
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "./FormStyling.module.css";
import EarthLogo from "../Assets/EarthLogo.gif"
import Footer from "../HomePageFooter/Footer";

const CompanyRegisterForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    mobileNumber: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    companyName: '',
    contactEmail: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.companyName.trim() === '') {
      newErrors.companyName = 'Company Name is required';
      isValid = false;
    }

    if (formData.contactEmail.trim() === '') {
      newErrors.contactEmail = 'Email is required';
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
      const response = await axios.post(
        'http://localhost:8081/employer-register',
        formData
      );

      if (response.status === 200) {
        setRegistrationStatus(true);
        console.log('User registered successfully');
        setFormData({
          companyName: '',
          contactEmail: '',
          mobileNumber: '',
        });
        alert(
          'Registration successful! Press OK to proceed to OTP page.'
        );
        navigate(`/employer-otp?email=${formData.contactEmail}`);
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
    <div>
      <div className={style.LoginContainer}>
        <Container p={5} textAlign="center" border="solid 2px #f2f2f2" borderRadius="15px" backgroundColor="#f2f2f26d">
          <h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1>
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Employer Registration
            </Heading>
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
                <FormLabel fontSize="20px">Name</FormLabel>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fontSize="22px"
                />
                <Text color="red.500">{errors.companyName}</Text>
              </FormControl>
              <FormControl isInvalid={errors.contactEmail !== ''}>
                <FormLabel fontSize="20px">Email</FormLabel>
                <Input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  fontSize="22px"
                />
                <Text color="red.500">{errors.contactEmail}</Text>
              </FormControl>
              <FormControl isInvalid={errors.mobileNumber !== ''}>
                <FormLabel fontSize="20px">Mobile Number</FormLabel>
                <Input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  fontSize="22px"
                />
                <Text color="red.500">{errors.mobileNumber}</Text>
              </FormControl>
              <Button className={style.LoginBtn} fontSize="20px" p={5} backgroundColor="#2870C1" colorScheme="teal" onClick={handleSubmit} isLoading={loading}>
                Register
              </Button>
            </VStack>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>



  );
};

export default CompanyRegisterForm;
