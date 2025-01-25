import axios, { AxiosRequestConfig } from 'axios';

const API_ORANGE_MARKET = 'https://api.orangemarketcap.com/';

export const getApi = async (endpoint: string, params?: Record<string, any>) => {
  try {
    const config: AxiosRequestConfig = {
      params, 
    };
    const response = await axios.get(`${API_ORANGE_MARKET}${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const postApi = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${API_ORANGE_MARKET}${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
