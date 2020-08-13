import axios from 'axios';
import { showAlert } from './alert';

// type is either data(name and email) or password
export const updateSettings = async (data, type) => {
  const url = type === 'password' ? 'updateMyPassword' : 'updateMe';
  try {
    const result = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${url}`,
      // url: `http://127.0.0.1:8000/api/v1/users/${url}`,
      data,
    });
    if (result.data.status === 'success') {
      showAlert(
        'success',
        `Your ${type.toUpperCase()} has been successfully updated`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
