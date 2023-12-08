import React, { useState, useEffect } from "react";
import { Avatar, Progress } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
 const uid=sessionStorage.getItem('srno');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-user-profile/${uid}`);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [uid]);

  const handleClick = () => {
    navigate("/profile-update");
  };

  return (
    <div className={styles.profileDiv}>
      <div className={styles.avtar}>
        <Avatar size="lg" mt="-10"></Avatar>
      </div>
      <div className={styles.AboutProfile}>
        <p className={styles.userName}>{userData.name}</p>
        <span className={styles.education}>{userData.education}</span>
        <br />
        <span>{userData.institute}</span>
      </div>
      <div className={styles.profileCompleted}>
        <div>
          <span>Profile Completed (Excellent)</span>
          <span style={{ fontSize: "15px" }}>{userData.completionPercentage}%</span>
        </div>
        <Progress size="sm" value={userData.completionPercentage} />
      </div>
      <div className={styles.details}>
        <p>{userData.detailsMissing} Details Missing</p>
        <Link to="/employement">ADD DETAILS</Link>
      </div>
      <div className={styles.updateProfile}>
        <button onClick={handleClick}>UPDATE PROFILE</button>
      </div>
      <div className={styles.profilePerformance}>
        <p>
          Profile Performance
          <span style={{ cursor: "pointer" }}>
            <ion-icon name="alert-circle-outline"></ion-icon>
          </span>
        </p>
        <div>
          <div>
            <p>{userData.searchAppearances}</p>
            <p>Search Appearances</p>
          </div>
          <div>
            <p>{userData.recruiterAction}</p>
            <p>Recruiter Action</p>
          </div>
        </div>
      </div>
      <div className={styles.lastDiv}>
        <span>
          <Link to="/">
            {userData.boostMessage}
            <span>{userData.paidService}</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
