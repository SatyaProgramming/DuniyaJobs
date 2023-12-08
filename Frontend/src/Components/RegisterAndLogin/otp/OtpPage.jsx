import React, { useState } from "react";
import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import LeftPane from "../register/LeftPane";
import style from "./OtpPage.module.css";
import { HStack, PinInput, PinInputField, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email") || "Default Email";
  const [otpEntered, setOtpEntered] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    // Assuming you want to send the email and OTP to the API using Axios
    axios
      .post("http://localhost:8081/verify-otp", { email, otp: otpEntered })
      .then((response) => {
        console.log("API response:", response.data);

        // Navigate after successful API call
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };

  const handleSkip = () => {
    // Navigate to the desired route when the "Skip" button is clicked
    navigate("/some-other-route");
  };

  return (
    <div>
      <NavbarRegister />
      <div className={style.otpPanes}>
        <LeftPane />

        <div className={style.otpRightPane}>
          <div className={style.otpRightPaneDiv}>
            <h2>Email passed to this: {email}</h2>
            <HStack>
              <PinInput placeholder="" onChange={(e) => setOtpEntered(e)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>

            <HStack pt={5}>
              <Button
                colorScheme="blue"
                borderRadius="20px"
                p="5"
                onClick={handleVerify}
              >
                Verify
              </Button>
              <Button
                colorScheme="blue"
                variant="link"
                onClick={handleSkip} // Call the handleSkip function on "Skip" button click
              >
                Skip
              </Button>
            </HStack>
          </div>
          <FooterRegister />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
