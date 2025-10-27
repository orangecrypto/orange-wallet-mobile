import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const API_ORANGE_MARKET = 'https://api.orangemarketcap.com/';

// Use native fetch with AbortController for timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Cache network state to avoid repeated NetInfo.fetch() calls
let isConnectedCache: boolean | null = null;
let lastNetCheckTime = 0;
const NET_CHECK_CACHE_DURATION = 5000; // 5 seconds

const checkInternetConnection = async () => {
  const now = Date.now();

  // Return cached result if checked recently
  if (isConnectedCache !== null && (now - lastNetCheckTime) < NET_CHECK_CACHE_DURATION) {
    return isConnectedCache;
  }

  const state = await NetInfo.fetch();
  isConnectedCache = state.isConnected || false;
  lastNetCheckTime = now;
  return isConnectedCache;
};

export const getApi = async (endpoint: string, params?: Record<string, any>) => {

  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    Toast.show({
      type: 'error',
      text1: 'No Internet Connection',
      text2: 'Please check your internet and try again.',
    });
    throw new Error('No Internet Connection');
  }

  try {
    // Build query string
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';

    const url = `${API_ORANGE_MARKET}${endpoint}${queryString}`;

    // Use native fetch instead of axios (faster on React Native)
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.log(error);
    // Only show toast for non-timeout errors to avoid spam
    if (error?.message !== 'Request timeout') {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Something went wrong.',
      });
    }
    throw error;
  }
};

export const postApi = async (endpoint: string, data: any) => {
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    Toast.show({
      type: 'error',
      text1: 'No Internet Connection',
      text2: 'Please check your internet and try again.',
    });
    throw new Error('No Internet Connection');
  }

  try {
    const url = `${API_ORANGE_MARKET}${endpoint}`;

    // Use native fetch instead of axios (faster on React Native)
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    // Only show toast for non-timeout errors to avoid spam
    if (error?.message !== 'Request timeout') {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Something went wrong.',
      });
    }
    throw error;
  }
};
