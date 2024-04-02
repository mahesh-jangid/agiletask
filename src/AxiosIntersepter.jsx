import axios from 'axios';

const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;