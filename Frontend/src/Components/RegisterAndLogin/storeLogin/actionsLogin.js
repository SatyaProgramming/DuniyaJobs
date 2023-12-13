// actionsLogin.js

import axios from 'axios';
import {
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from './actionTypesLogin';

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginAPI = (creds) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  const data = {
    username: creds.username,
    password: creds.password,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  axios
    .post('http://localhost:8081/login', data, {
      headers: headers,
    })
    .then((response) => {
      dispatch(loginSuccess(response.data));
    })
    .catch((error) => {
      console.error('Login failed:', error);
      dispatch(loginFailure());
    });
};

export const logoutAPI = () => ({ type: LOGOUT });
