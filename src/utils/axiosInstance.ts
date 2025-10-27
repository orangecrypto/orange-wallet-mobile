import axios from 'axios';

/**
 * Shared axios instance with timeout and proper configuration
 * Use this instead of raw axios to avoid hanging requests
 */
export const axiosInstance = axios.create({
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios instance for external DeFi APIs (Swap, Borrow)
 * Slightly longer timeout for blockchain operations
 */
export const defiAxiosInstance = axios.create({
  timeout: 45000, // 45 second timeout for DeFi operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.config?.url);
    }
    return Promise.reject(error);
  }
);

defiAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('DeFi request timeout:', error.config?.url);
    }
    return Promise.reject(error);
  }
);
