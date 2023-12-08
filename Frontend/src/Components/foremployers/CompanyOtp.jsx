import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

const CompanyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState({ success: false, message: "" });

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:8081/send-otp", { email });
      setStatus({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      setStatus({ success: false, message: error.response.data });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("http://localhost:8081/verify-otp", { email, enteredOtp: otp });
      setStatus({ success: true, message: "OTP verified successfully" });
    } catch (error) {
      setStatus({ success: false, message: error.response.data });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>OTP Verification</Heading>

      {!status.success && (
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
      )}

      {!status.success && (
        <Button
          colorScheme="teal"
          onClick={handleSendOtp}
          mr={2}
          mb={4}
        >
          Send OTP
        </Button>
      )}

      {!status.success && (
        <FormControl id="otp" mb={4} isRequired>
          <FormLabel>Enter OTP</FormLabel>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormControl>
      )}

      {!status.success && (
        <Button
          colorScheme="blue"
          onClick={handleVerifyOtp}
          mr={2}
          mb={4}
        >
          Verify OTP
        </Button>
      )}

      {status.message && (
        <Alert
          status={status.success ? "success" : "error"}
          variant="subtle"
          mt={4}
        >
          <AlertIcon />
          {status.message}
        </Alert>
      )}
    </Box>
  );
};

export default CompanyOtp;
