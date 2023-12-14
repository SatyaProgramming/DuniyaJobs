// src/components/JobForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const JobForm = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    requirements: '',
  });

  useEffect(() => {
    // Retrieve companyId from sessionStorage (assuming it's stored as 'companyId')
    const storedCompanyId = sessionStorage.getItem('companyId');

    if (storedCompanyId) {
      setJob((prevJob) => ({
        ...prevJob,
        companyId: storedCompanyId,
      }));
    }
  }, []); // Run this effect only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to save the job with companyId
      const response = await axios.post('http://localhost:8081/save-job', job);

      // Handle the response as needed (e.g., show a success message)
      console.log('Job saved successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error saving job:', error.message);
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="md" mt={10}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" value={job.title} onChange={handleInputChange} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input type="text" name="description" value={job.description} onChange={handleInputChange} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Location</FormLabel>
          <Input type="text" name="location" value={job.location} onChange={handleInputChange} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Requirements</FormLabel>
          <Input type="text" name="requirements" value={job.requirements} onChange={handleInputChange} />
        </FormControl>

        <Button colorScheme="teal" mt={4} onClick={handleSubmit}>
          Save Job Post
        </Button>
      </Container>
    </ChakraProvider>
  );
};

export default JobForm;
