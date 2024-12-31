import axios from 'axios';

// Kullanıcı API'leri
export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/api/users/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get('/api/users/leaderboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

// Yarışma API'leri
export const submitActivity = async (activityData: {
  userId: string;
  type: string;
  value: number;
}) => {
  try {
    const response = await axios.post('/api/competition/activities', activityData);
    return response.data;
  } catch (error) {
    console.error('Error submitting activity:', error);
    throw error;
  }
};

export const getUserActivities = async (userId: string) => {
  try {
    const response = await axios.get(`/api/competition/activities/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user activities:', error);
    throw error;
  }
};