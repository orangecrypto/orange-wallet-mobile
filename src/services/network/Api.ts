import axios, { AxiosRequestConfig } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const API_ORANGE_MARKET = 'https://api.orangemarketcap.com/';

const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
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
    const config: AxiosRequestConfig = { params };
    const response = await axios.get(`${API_ORANGE_MARKET}${endpoint}`, config);
    return response.data;
  } catch (error: any) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: error?.message || 'Something went wrong.',
    });
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
    const response = await axios.post(`${API_ORANGE_MARKET}${endpoint}`, data);
    return response.data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error?.message || 'Something went wrong.',
    });
    throw error;
  }
};
