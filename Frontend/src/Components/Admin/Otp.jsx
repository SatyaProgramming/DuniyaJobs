import React, { useState } from 'react';
import axios from 'axios';
import { VStack, Input, Button, FormControl, FormLabel, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const emailValue = searchParams.get('email');

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8082/admins/verify-otp', null, {
        params: { email: emailValue, otp },
      });

      if (response.status === 200) {
        setVerificationResult(response.data);
        setShowPasswordFields(true);
      } else {
        setVerificationResult(`Error: ${response.data}`);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setVerificationResult('An error occurred during OTP verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setVerificationResult('Password and Confirm Password do not match.');
      return;
    }
  
    try {
      setLoading(true);
      // Send the password to another endpoint if password and confirmPassword match
      const response = await axios.post('http://localhost:8081/admins/set-password', null, {
        params: { email: emailValue, password },
      });

      if (response.status === 200) {
        setVerificationResult('Password set successfully.');
        navigate('/admin/login'); // Redirect to login page upon success
      } else {
        setVerificationResult(`Error setting password: ${response.data}`);
      }
    } catch (error) {
      console.error('Error setting password:', error);
      setVerificationResult('An error occurred while setting the password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <VStack align="center" m={5} spacing={4}>
      <Heading>OTP Verification</Heading>

      
      <FormControl>
        <FormLabel>OTP</FormLabel>
        <Input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
      </FormControl>

      <Button colorScheme="teal" onClick={handleVerifyOTP} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      {verificationResult && <Text>{verificationResult}</Text>}

      {showPasswordFields && (
        <>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" onClick={handlePasswordSubmit} disabled={loading}>
        {loading ? 'Setting Password...' : 'Set Password'}
      </Button>
        </>
      )}
    </VStack>
  );
};

export default Otp;
