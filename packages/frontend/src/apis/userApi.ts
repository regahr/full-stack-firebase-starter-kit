import axios from 'axios';
import { User } from '../../../shared/user';

const API_BASE_URL = `http://localhost:5005/user-collection-88e80/us-central1/app/api`;

export const userApi = {
  createUser: async (data: User, token: string ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-user-data`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchUserInfo: async (email: string, token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-user-data/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateUserInfo: async (email: string, data: User, token: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-user-data/${email}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 