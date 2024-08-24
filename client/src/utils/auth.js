import api from './api';

export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('jwtToken');
  };
  
  export const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const logout = () => {
    removeAuthToken();
    window.location.href = '/login';
  };
  