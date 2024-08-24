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
  