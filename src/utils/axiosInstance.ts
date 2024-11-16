import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl || 'https://api.example.com', // Use environment variable or fallback URL
});

export default axiosInstance;
