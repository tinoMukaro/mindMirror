import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/", 
  withCredentials: true, // This is crucial for cookies to work
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;