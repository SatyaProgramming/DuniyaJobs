import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Avatar,
  Badge,
} from '@chakra-ui/react';

const EmployeeProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8081/latest-profiles');
        // Assuming the latest profiles response has properties like data or profiles
        setProfiles(response.data?.data || response.data?.profiles || []);
      } catch (error) {
        console.error('Error fetching latest profiles from the API', error);
      }
    };

    fetchProfiles();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <VStack align="stretch" spacing={4}>
      {profiles.length === 0 ? (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
          <Text>No Latest Profiles</Text>
        </Box>
      ) : (
        profiles.map((profile) => (
          <Box
            key={profile.id}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            width="100%"
          >
            <Flex align="center">
              <Avatar size="lg" name={profile.name} src={profile.avatar} />
              <VStack ml={4} align="start" flex="1">
                <Text fontWeight="bold">{profile.name}</Text>
                <Text>{profile.position}</Text>
                <Badge colorScheme="green">{profile.department}</Badge>
              </VStack>
            </Flex>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default EmployeeProfileList;
