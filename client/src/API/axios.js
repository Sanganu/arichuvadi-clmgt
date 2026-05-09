import axios from 'axios';

// All cookies (board.sid / connect.sid) carried on every request
axios.defaults.withCredentials = true;

// Optional: in production set a baseURL via .env
if (process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

// On any 401 → wipe redux + localStorage and bounce to /
axios.interceptors.response.use(
  (response) => response,
  (error) => { if (error.response && error.response.status === 401) {
      // hard nav avoids stale router state
      if (window.location.pathname !== '/') window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axios;
