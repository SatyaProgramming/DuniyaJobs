import React, { useState } from 'react';
import axios from 'axios';
import { Button, InputLeftAddon, InputGroup, Input, FormLabel, Box, Text, Heading, FormControl, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import style from "./Employement.module.css";
import Navbar from '../../HomePageNavbar/Navbar';
import FooterRegister from '../NavAndFooter/FooterRegister';
import { useNavigate } from "react-router-dom";

const Employment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employed: false,
    experienceYears: '0',
    experienceMonths: '0',
    prevCompany: '',
    prevJob: '',
    city: '',
    srno: sessionStorage.getItem('srno') || '',
    annualSalary: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate "Total Work Experience"
    if (!formData.experienceYears || isNaN(formData.experienceYears) || formData.experienceYears < 0) {
      newErrors.experienceYears = 'Please enter a valid experience in years.';
      valid = false;
    }

    if (!formData.experienceMonths || isNaN(formData.experienceMonths) || formData.experienceMonths < 0 || formData.experienceMonths >= 12) {
      newErrors.experienceMonths = 'Please enter a valid experience in months (0-11).';
      valid = false;
    }

    // Validate "Previous Company"
    if (!formData.prevCompany.trim()) {
      newErrors.prevCompany = 'Please enter your previous company.';
      valid = false;
    }

    // Validate "Previous Job Title"
    if (!formData.prevJob.trim()) {
      newErrors.prevJob = 'Please enter your previous job title.';
      valid = false;
    }

    // Validate "Current city"
    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your current city.';
      valid = false;
    }

    // Validate "Annual Salary"
    if (!formData.annualSalary || isNaN(formData.annualSalary) || formData.annualSalary < 0) {
      newErrors.annualSalary = 'Please enter a valid annual salary.';
      valid = false;
    }

    // Update state with validation errors
    setErrors(newErrors);

    return valid;
  };

  const showAlert = (message, isSuccess) => {
    const alertType = isSuccess ? 'success' : 'error';
    alert(`${alertType.toUpperCase()}: ${message}`);
  };

  const sendDataToServer = async () => {
    if (validateForm()) {
      const url = 'http://localhost:8081/employment-save';

      try {
        const response = await axios.post(url, formData);

        // Handle the response from the server if needed
        console.log('Server response:', response.data);

        // Show success alert
        if (response.status === 200) {
          navigate('/education');
          showAlert('Your data was successfully submitted.', true);
        }
      } catch (error) {
        console.error('Error sending data to server:', error.message);

        // Show error alert
        showAlert('There was an error submitting your data.', false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style.EmployementPanes}>
        <Box className={style.EmployementPanesUpper}>
          <Text fontSize="2xl">Employement</Text>
          <Text>Your experience is your</Text>
          <Text>success story, talk about it</Text>
        </Box>
        <Box className={style.rightEmployementBox}>
          <Heading size="lg">Add your Employement</Heading>
          <Text fontSize="md" mt="5" mb="5">
            Employement details help recruiters understand your background
          </Text>
          <FormControl className={style.rightEmployementForm}>
            <div className={style.rightEmployementFormDiv}>
              <div>
                <FormLabel htmlFor="employed">Are you currently employed?</FormLabel>
                <RadioGroup
                  value={formData.employed}
                  onChange={(value) => setFormData({ ...formData, employed: value })}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" checked={formData.employed === 'true'} onChange={handleChange} value="true">
                      Yes
                    </Radio>
                    <Radio colorScheme="green" checked={formData.employed === 'false'} onChange={handleChange} value="false">
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
                {/* Display validation errors */}
                {errors.employed && <p style={{ color: 'red' }}>{errors.employed}</p>}
              </div>
              <div>
                <FormLabel htmlFor="experience">Total Work Experience</FormLabel>
                <Stack spacing={5} direction="row">
                  <Input type="text" name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
                  <Input
                    type="text"
                    placeholder="0 Month"
                    isRequired
                    name="experienceMonths"
                    value={formData.experienceMonths}
                    onChange={handleChange}
                  />
                </Stack>
                {/* Display validation errors */}
                {errors.experienceYears && <p style={{ color: 'red' }}>{errors.experienceYears}</p>}
                {errors.experienceMonths && <p style={{ color: 'red' }}>{errors.experienceMonths}</p>}
              </div>
              <div>
                <FormLabel htmlFor="prevCompany" isRequired>
                  Previous Company
                </FormLabel>
                <Input
                  id="prevCompany"
                  placeholder="Eg. Amazon"
                  isRequired
                  type="text"
                  name="prevCompany"
                  value={formData.prevCompany}
                  onChange={handleChange}
                />
                {/* Display validation errors */}
                {errors.prevCompany && <p style={{ color: 'red' }}>{errors.prevCompany}</p>}
              </div>
              <div>
                <FormLabel htmlFor="prevJob" isRequired>
                  Previous Job Title
                </FormLabel>
                <Input
                  id="prevJob"
                  type="text"
                  placeholder="Eg. Software Developer"
                  name="prevJob"
                  value={formData.prevJob}
                  onChange={handleChange}
                />
                {/* Display validation errors */}
                {errors.prevJob && <p style={{ color: 'red' }}>{errors.prevJob}</p>}
              </div>
              <div>
                <FormLabel htmlFor="city" isRequired>
                  Current city
                </FormLabel>
                <Input
                  id="city"
                  type="text"
                  placeholder="Mention the current city you live in"
                  isRequired
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {/* Display validation errors */}
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
              </div>
              <div>
                <FormLabel htmlFor="salary" isRequired>
                  Annual Salary
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon children="₹" />
                  <Input
                    placeholder="Eg. 5,64,000"
                    type="text"
                    name="annualSalary"
                    value={formData.annualSalary}
                    onChange={handleChange}
                  />
                </InputGroup>
                {/* Display validation errors */}
                {errors.annualSalary && <p style={{ color: 'red' }}>{errors.annualSalary}</p>}
              </div>
              <div>
                <Button colorScheme="blue" onClick={sendDataToServer}>
                  Save and Continue
                </Button>
              </div>
            </div>
          </FormControl>
        </Box>
      </div>
      <div >
        <FooterRegister />
      </div>
    </div>
  );
};

export default Employment;
