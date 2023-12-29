import React, { useState } from "react";
import style from "./empbody.module.css";
import CompanyRegisterForm from "./CompanyRegisterForm";

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
      <div className={style.subbody1}>
        <div>

          {/* here is the login and register form */}
          {/* <CompanyRegisterForm/> */}



        </div>
      </div>

      <div className={style.subbody2}>
        <div>
          <div className={style.sb2}>
            <p className={style.blue}>PRODUCTS & SERVICES</p>
            <p className={style.large}>MeriJob is India’s No.1 Job Posting</p>
            <p className={style.large}>& Recruitment Platform</p>
          </div>
        </div>
        <div className={style.sb2mainflex}>
          <div className={style.sb2submain1}>
            <div>
              <p className={style.jobposting}>
                MeriJob Job Posting Services - Get Quality Applies
              </p>
              <p>
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
                  <p>Unlimited Applies</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-user-group"></i>
                  <p>Attract Audience</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-calendar"></i>
                  <p>30 Day Visibility</p>
                </div>
              </div>
              <button className={style.body1btn}>Know More</button>
            </div>
            <img src="https://www.goteso.com/assets/images/training/banner/best-online-it-training.png" alt="" />
          </div>
          <div className={style.sb2submain1}>
            <img src="https://flow-online.co.uk/wp-content/uploads/2021/08/creating-online-courses.png" alt=""/>
            <div>
              <p className={style.jobposting}>
                Search Best Talent with MeriJob’s Resume Database Access - Resdex
              </p>
              <p>
                Source candidates from Resdex − India’s largest Talent Pool and
                find the perfect talent for your organisation.
              </p>
              <div className={style.sb2grid}>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-id-badge"></i>
                  <p>Over 8.27 crore Jobseekers</p>
                </div>
                <div className={style.sb2flex}>
                  <i className="fa-solid fa-magnifying-glass-location"></i>
                  <p>Smart Talent Search</p>
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
