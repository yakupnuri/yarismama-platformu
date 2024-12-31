import axios from 'axios';

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/user/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};