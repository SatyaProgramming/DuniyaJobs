// config.js
const API_BASE_URL = 'http://localhost:8081';

const API_ENDPOINTS = {
  VERIFY_OTP: `${API_BASE_URL}/verify-otp`,
  SET_PASSWORD: `${API_BASE_URL}/set-password`,
};

export { API_BASE_URL, API_ENDPOINTS };
