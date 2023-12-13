import React, { useState } from 'react';
import axios from 'axios';
import { VStack, Input, Button, FormControl, FormLabel, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CompanyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const emailValue = searchParams.get('email');

  const makeServerRequest = async (url, params, successMessage, errorMessage) => {
    try {
      setLoading(true);
      const response = await axios.post(url, null, { params });

      if (response.status === 200) {
        setVerificationResult(successMessage);

        // Additional logic based on the success of the request
        // ...

      } else {
        setVerificationResult(`Error: ${response.data}`);
      }
    } catch (error) {
      console.error(errorMessage, error);
      setVerificationResult(`An error occurred during ${errorMessage.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const url = 'http://localhost:8081/company-verify-otp';
    const successMessage = 'OTP verification successful.';
    const errorMessage = 'OTP verification';
    
    await makeServerRequest(url, { email: emailValue, otp }, successMessage, errorMessage);

    // If OTP verification is successful, show password fields
    setShowPasswordFields(true);
  };

  const handlePasswordSubmit = async () => {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setVerificationResult('Password and Confirm Password do not match.');
      return;
    }

    const url = 'http://localhost:8081/company-set-password';
    const successMessage = 'Password set successfully.';
    const errorMessage = 'Setting password';

    await makeServerRequest(url, { email: emailValue, password }, successMessage, errorMessage);

    // Navigate to the login page upon successful password submission
    navigate('/employer-login');
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

export default CompanyOtp;
