// src/components/JobList.js
import React, { useEffect, useState } from 'react';
import { Box, Text, Link, Flex, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import styles from "./Jobs.module.css"
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual API endpoint for fetching jobs
    fetch('http://localhost:8081/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleJobPage = () => {
    navigate('/jobrecomandation');
  };

  return (
    <Box
      w={'100%'}
      h="350px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      bg={'#fff'}
      mt="2"
    >
      <Text p={'4'} fontWeight={'bold'}>
        {jobs.length} New Recommended Job(s)
      </Text>
      <hr />
      {jobs.map((job) => (
        <Box key={job.id} className={styles.head} w={'100%'} p="6">
          <Text fontSize={'15px'} color="gray.700" fontWeight={'bold'}>
            {job.title}
          </Text>
          <Text fontSize={'xs'} fontWeight="medium" color={'gray.600'}>
            {job.companyName}
          </Text>

          <Flex p={'2'} gap="10">
            <HStack color={'gray.600'}>
              <ion-icon name="briefcase-outline"></ion-icon>
              <Text>{job.experience}</Text>
            </HStack>
            <HStack color={'gray.600'}>
              <ion-icon name="location-outline"></ion-icon>
              <Text>{job.location}</Text>
            </HStack>
          </Flex>

          <Flex mt={'-2'} p={'2'} gap="4" alignItems={'center'} color={'gray.600'}>
            <ion-icon name="layers-outline"></ion-icon>
            <Text fontSize={'14px'}>{job.skills}</Text>
          </Flex>

          <Flex mt={'-2'} p={'2'} gap="4" alignItems={'center'} color={'gray.600'}>
            <ion-icon name="reader-outline"></ion-icon>
            <Text fontSize={'14px'} display={{}}>
              {job.description}
            </Text>
          </Flex>

          <Flex justifyContent={'space-between'} p="2" alignItems={'center'}>
            <Flex p={'2'} color={'gray.600'} alignItems={'center'} gap="4">
              <ion-icon name="wallet-outline"></ion-icon>
              <Text>{job.salary}</Text>
            </Flex>
            <Text pr={'2'} color={'gray.600'} fontSize={'xs'}>
              Posted {job.postedDate}
            </Text>
          </Flex>
          <Link pr={'4'} color='twitter.500' float={'right'} onClick={handleJobPage}>
            View All
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Jobs;
