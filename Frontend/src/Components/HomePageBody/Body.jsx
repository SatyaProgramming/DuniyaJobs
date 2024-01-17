import {
  Avatar,
  Box,
  Button,

  Flex,

  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import styles from "./Body.module.css";
import MeriJobFastForward from "./MeriJobFastForward";

import ProfileCard from "./ProfileCard";
import Qrscanner from "./Qrscanner";
import Jobs from "./Jobs";
import WithSubnavigation from "../HomePageNavbar/Navbar";
import Footer from "../HomePageFooter/Footer";
import { useNavigate } from "react-router-dom";
import MeriJobPulse from "./MeriJobPulse";
import LandingBody from "../LandingPage/LandingBody";

const Body = () => {
  const ref = useRef();
  ref.current = false;
  const [follow1, setFollow1] = useState(false);
  const [follow2, setFollow2] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <WithSubnavigation />
      <div className={styles.mainbody}>
        <div className={styles.boxes}>
          <div className={styles.contentBoxes}>
            {/* First Box of the body start from here */}

            <div className={styles.box1}>
              {/* Search Box */}
              <div className={styles.search}>
                <div>
                  <input
                    type="text"
                    placeholder="Search job by Skills,Designation,Companies"
                  />
                  <button>SEARCH JOBS</button>
                </div>
                {/* Components */}
              </div>
              <MeriJobPulse />

              <Jobs />
              <Flex
                w={"100%"}
                h="220px"
                mt={"6"}
                justifyContent="space-between"
              >

              </Flex>


            </div>

            {/* Second box of the body start from here */}

            <div className={styles.box2}>
              <ProfileCard />
              <Qrscanner />
              <MeriJobFastForward />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
