import axios from 'axios';



const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );


  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
       
        console.log("Runnnn")
        localStorage.removeItem('token');
        window.location.href = '/'; 
      }
      return Promise.reject(error);
    }
  );
  
  return axios;
};

export default setupAxiosInterceptors;