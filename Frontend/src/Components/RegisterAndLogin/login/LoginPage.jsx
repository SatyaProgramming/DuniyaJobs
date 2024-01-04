// LoginPage.js
import React from 'react';
import LoginNav from './LoginNav';
import LoginForm from './LoginForm';
import style from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={style.pageContainer}>
      <LoginNav />

      <div className={style.loginPageDivs}>
        {/* Left Box */}
        <div className={style.loginPageBox}>
          <h2 className={style.heading}>New to Meri Job</h2>

          <div className={style.feature}>
            <span className={style.icon}>✓</span>
            <span>One click apply using MeriJob profile.</span>
          </div>
          <div className={style.feature}>
            <span className={style.icon}>✓</span>
            <span>Get relevant job recommendations.</span>
          </div>
          <div className={style.feature}>
            <span className={style.icon}>✓</span>
            <span>Showcase profile to top companies and consultants.</span>
          </div>
          <div className={style.feature}>
            <span className={style.icon}>✓</span>
            <span>Know application status on applied jobs.</span>
          </div>

          <button className={style.registerButton}>Register for free</button>
        </div>

        {/* Right Box */}
        <div className={style.loginPageBoxForm}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
