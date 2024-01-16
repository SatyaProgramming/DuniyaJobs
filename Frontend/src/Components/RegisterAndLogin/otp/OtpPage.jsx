// OtpPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Change this line
import { API_ENDPOINTS } from './../../../config/userConfig';
import style from "./OtpPage.module.css";

const OtpPage = () => {
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();  // Change this line
  const [loading, setLoading] = useState(false);

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const emailValue = searchParams.get('email');

  const handleApiResponse = async (apiEndpoint, params) => {
    try {
      setLoading(true);
      const { status, data } = await axios.post(apiEndpoint, null, { params });

      if (status === 200) {
        setVerificationResult(data);
        if (apiEndpoint === API_ENDPOINTS.VERIFY_OTP) {
          setShowPasswordFields(true);
        } else if (apiEndpoint === API_ENDPOINTS.SET_PASSWORD) {
          navigate('/login');  // Change this line
        }
      } else {
        setVerificationResult(`Error: ${data}`);
      }
    } catch (error) {
      console.error(`Error during API call to ${apiEndpoint}:`, error);
      setVerificationResult(
        `An error occurred during ${
          apiEndpoint === API_ENDPOINTS.VERIFY_OTP ? 'OTP verification' : 'password setting'
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style['otp-container']}>
      <h2 className={style.h2}>OTP Verification</h2>

      <div className={style['form-control']}>
        <label className={style.label}>OTP</label>
        <input className={style.InputBx} type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
      </div>

      <button className={style['submit-button']} onClick={async () => await handleApiResponse(API_ENDPOINTS.VERIFY_OTP, { email: emailValue, otp })} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {verificationResult && <p className={style.para}>{verificationResult}</p>}

      {showPasswordFields && (
        <>
          <div className={style['form-control']}>
            <label className={style.label}>Password</label>
            <input className={style.InputBx} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className={style['form-control']}>
            <label>Confirm Password</label>
            <input
            className={style.InputBx}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={style['submit-button']} onClick={async () => await handleApiResponse(API_ENDPOINTS.SET_PASSWORD, { email: emailValue, password })} disabled={loading}>
            {loading ? 'Setting Password...' : 'Set Password'}
          </button>
        </>
      )}
    </div>
  );
};

export default OtpPage;
