import axios from 'axios';

// Create an axios instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // API URL
    headers: {
        "Content-Type": "application/json",
      },
    });

    // Add a request interceptor
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
