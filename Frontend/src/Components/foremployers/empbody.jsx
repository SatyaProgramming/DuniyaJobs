import React, { useState } from "react";
import style from "./empbody.module.css";
import CompanyRegisterForm from "./CompanyRegisterForm";
import EarthLogo from "../Assets/EarthLogo.gif"
import Meeting from "../Assets/meeting.svg"
import PeopleSearch from "../Assets/peopleSearch.svg"

const Empbody = ({ hideall }) => {
  const [issales, setissales] = useState(true);
  const [islr, setislr] = useState(false);
  let showlr = () => {
    setislr(true);
    setissales(false);
  };
  let showsales = () => {
    setislr(false);
    setissales(true);
  };
  return (
    <div className={style.empbody} onMouseEnter={hideall}>
      {/* <div className={style.subbody1}>
        <div>
          here is the login and register form
          <CompanyRegisterForm />
        </div>
      </div> */}

      <div className={style.subbody2}>
        <div>
          <div className={style.sb2}>
            <h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1>
            <h2 className={style.landingTagLine}>Best Platform to Find Quality Job Seekers</h2>
          </div>
        </div>
        <div className={style.sb2mainflex}>
          <div className={style.sb2submain1}>
            <div>
              <h3 className={style.jobposting}>
                DuniyaJob's Job Posting Services - Get Quality Jobseekers
              </h3>
              <p className={style.TagLines}>
                Reach out to millions of jobseekers and hire quickly with our fast
                and easy job posting services.
              </p>
              <div className={style.sb2grid}>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-stopwatch"></i>
                  <p>2 Minutes to Post</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-address-book"></i>
                  <p>Unlimited number of Applies</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-user-group"></i>
                  <p>Attract Jobseekers</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-calendar"></i>
                  <p>30 Day Visibility</p>
                </div>
              </div>
              <button className={style.body1btn}>Know More</button>
            </div>
            <img src={Meeting} alt="Image" />
          </div>
          <div className={style.sb2submain1}>
            <img src={PeopleSearch} alt="Image" />
            <div>
              <h3 className={style.jobposting}>
                Search Best Talent with DuniyaJob’s Resume Database
              </h3>
              <p className={style.TagLines}>
                Large Talent Pool of DuniyaJobs holds Profiles of the Perfect Candidates for your Organisation
              </p>
              <div className={style.sb2grid}>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-id-badge"></i>
                  <p>Quality Profiles</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-magnifying-glass-location"></i>
                  <p>Smart Filters</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-phone"></i>
                  <p>Contact Directly</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-calendar-check"></i>
                  <p>Verified Candidates</p>
                </div>
              </div>
              <button className={style.body1btn}>Know More</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Empbody;
