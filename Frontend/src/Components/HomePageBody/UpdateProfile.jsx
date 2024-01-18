import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Text, FormControl, RadioGroup, HStack, Radio, Container, FormLabel, Input, Box, IconButton, Center } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import style from "./UpdateProfile.module.css"
const UpdateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState('');
  const [profile, setProfile] = useState({
    uid: 0,
    fullName: '',
    mobileNumber: '',
    resume: null,
    employed: false,
    experienceYears: null,
    experienceMonths: null,
    prevCompany: '',
    prevJob: '',
    city: '',
    annualSalary: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  // Function to fetch the existing profile data
  const fetchProfileData = async () => {
    try {
      const srno = sessionStorage.getItem('srno');
      if (srno) {
        const response = await axios.get(`http://localhost:8081/profile-update/${srno}`);
        const ImageResponse = await axios.get(`http://localhost:8081/image/${srno}`);
        if (response.status === 200) {
          setProfile(response.data);
          setImageData(ImageResponse.config.url);
        } else {
          console.error('Failed to fetch profile data.');
        }
      } else {
        console.error('User ID not found in sessionStorage.');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Function to update the profile data
  const updateProfile = async () => {
    try {
      const srno = sessionStorage.getItem('srno');
      const response = await axios.put(`http://localhost:8081/profile-update/${srno}`, profile);
      if (response.status === 200) {
        setSubmissionStatus('success');
        console.log('Profile updated successfully:', response.data);
      } else {
        setSubmissionStatus('fail');
        console.error('Failed to update profile.');
      }
    } catch (error) {
      setSubmissionStatus('fail');
      console.error('Error updating profile:', error);
    }
  };


  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.post(`http://localhost:8081/upload-image/${profile.uid}`, formData);

      if (response.status === 200) {
        console.log('Image uploaded successfully:', response.data);
      } else {
        console.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  // useEffect to fetch the data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, [imageData]);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const updatedValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: name === 'employed' ? updatedValue === 'true' : updatedValue,
    }));
  };

  const handleEditClick = () => {
    setIsEditingImage(true);
  };

  // Function to handle the update button click
  const handleUpdateProfile = async () => {
    if (selectedImage) {
      await uploadImage();
    }
    updateProfile();
  };

  return (
    <Container textAlign="center">
      {submissionStatus === 'success' && (
        <Text color="green" mt={2}>
          Profile updated successfully!
        </Text>
      )}

      {submissionStatus === 'fail' && (
        <Text color="red" mt={2}>
          Failed to update profile. Please try again.
        </Text>
      )}
      <Text
        fontSize="4xl"
        fontWeight="extrabold" >Profile Information
      </Text>
      <Box
        w="200px"
        h="200px"
        borderRadius="full"
        position="relative"
        overflow="hidden"
        border="solid 2px #CCCC"
        margin="0 auto"
        onMouseEnter={() => setIsEditing(true)}
        onMouseLeave={() => setIsEditing(false)}
      >
        <img className={style.user_prof} src={imageData} alt="none"/>
        <Input
          type="file"
          accept="image/*"
          opacity="0"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          cursor="pointer"
          zIndex="1"
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedImage(file);
          }}
        />
        {isEditing && (

          <IconButton
            icon={<FaEdit />}
            aria-label="Edit"
            position="absolute"
            bottom="0"
            left="0"
            fontSize="18px"
            color="black"
            borderRadius="full"
            width="200px"
            backgroundColor="#00000029"
            onClick={handleEditClick}
          />
        )}
        {/* Display the selected image */}
        {selectedImage && (
          <Box
            bgImage={`url(${imageData})`}
            bgSize="cover"
            bgPosition="center"
            w="100%"
            h="100%"
            id="ProfileIcon"
          >
          </Box>
        )}
      </Box>
      <FormControl formEncType="multipart/form-data" >
        <FormLabel >Full Name:</FormLabel>
        <Input
          type="text"
          name="fullName"
          value={profile.fullName || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <FormLabel >Mobile Number:</FormLabel>
        <Input
          type="number"
          name="mobileNumber"
          value={profile.mobileNumber || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <FormLabel>Resume:</FormLabel>
        <Input type="file" name="resume" onChange={handleInputChange} />

        <div>
          <FormLabel >
            Are you currently employed?
          </FormLabel>
          <RadioGroup defaultValue={profile.employed.toString()}>
            <HStack spacing='24px'>
              <Radio
                colorScheme="green"
                value="true"
                onChange={handleInputChange}
              >
                Yes
              </Radio>
              <Radio
                colorScheme="green"
                value="false"
                onChange={handleInputChange}
              >
                No
              </Radio>
            </HStack>
          </RadioGroup>

        </div>

        <FormLabel >Previous Company:</FormLabel>
        <Input
          type="text"
          name="prevCompany"
          value={profile.prevCompany || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <FormLabel >Previous Job Title:</FormLabel>
        <Input
          type="text"
          name="prevJob"
          value={profile.prevJob || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <FormLabel >Current City:</FormLabel>
        <Input
          type="text"
          name="city"
          value={profile.city || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <FormLabel >Annual Salary:</FormLabel>
        <Input
          type="text"
          name="annualSalary"
          value={profile.annualSalary || ''} // Ensure it's not null
          onChange={handleInputChange}
          required
        />

        <Button mt={[5, 5]} colorScheme="blue" type="button" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </FormControl>
    </Container>
  );
};

export default UpdateProfile;
