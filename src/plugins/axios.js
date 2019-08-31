import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL || 'http://localhost:3000/api'
})

axios.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default http;
