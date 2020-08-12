/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(result);

    
    if (result.data.status === 'success') {
      showAlert('success', 'You are now logged in!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });
    if (result.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out, try again later!');
  }
};
