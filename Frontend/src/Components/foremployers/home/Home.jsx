// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import EmployeeProfileList from './EmployeeProfileList';
import SearchSuggestions from './SearchSuggestions';

const Home = () => {
  const [apiData, setApiData] = useState({
    jobposts: 0,
    jobview: 0,
    applications: 0,
    interviews: 0,
    applicants: 0,
    scheduledInterviews: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/dashboard-data');
        setApiData({
          jobposts: response.data?.jobposts ?? 0,
          jobview: response.data?.jobview ?? 0,
          applications: response.data?.applications ?? 0,
          interviews: response.data?.interviews ?? 0,
          scheduledInterviews: response.data?.scheduledInterviews ?? 0,
        });
      } catch (error) {
        console.error('Error fetching data from the API', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:8081/applicants');
        setApiData((prevData) => ({
          ...prevData,
          applicants: response.data?.totalApplicants ?? 0,
        }));
      } catch (error) {
        console.error('Error fetching applicants from the API', error);
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    const fetchScheduledInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:8081/scheduled-interviews');
        setApiData((prevData) => ({
          ...prevData,
          scheduledInterviews: response.data?.totalScheduledInterviews ?? 0,
        }));
      } catch (error) {
        console.error('Error fetching scheduled interviews from the API', error);
      }
    };

    fetchScheduledInterviews();
  }, []); 

  return (
    <Container maxW="full" mt={4} width="100%" minHeight="100vh" p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Employer Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} width="100%">
        <Stat bg="teal.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Job Postings</StatLabel>
          <StatNumber>{apiData.jobposts}</StatNumber>
        </Stat>

        <Stat bg="blue.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Job Views</StatLabel>
          <StatNumber>{apiData.jobview}</StatNumber>
        </Stat>

        <Stat bg="green.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Applications</StatLabel>
          <StatNumber>{apiData.applications}</StatNumber>
        </Stat>

        <Stat bg="orange.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Interviews</StatLabel>
          <StatNumber>{apiData.interviews}</StatNumber>
        </Stat>
      </SimpleGrid>

      <SimpleGrid columns={1} mt={8} spacing={4} width="100%">
        <Box width="100%">
          <Heading as="h3" size="lg" mb={4}>
            Latest Profiles
          </Heading>
          <EmployeeProfileList />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mt={8} spacing={4} width="100%">
        <Stat bg="purple.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Total Applicants</StatLabel>
          <StatNumber>{apiData.applicants}</StatNumber>
        </Stat>

        <Stat bg="yellow.500" p={4} borderRadius="md" color="white" className='DisplayCard'>
          <StatLabel>Total Scheduled Interviews</StatLabel>
          <StatNumber>{apiData.scheduledInterviews}</StatNumber>
        </Stat>
      </SimpleGrid>
      <SearchSuggestions/>
    </Container>
  );
};

export default Home;
