import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://api.orangemarketcap.com';

export const getApi = async (endpoint: string, params?: Record<string, any>) => {
  try {
    const config: AxiosRequestConfig = {
      params, 
    };
    const response = await axios.get(`${BASE_URL}/${endpoint}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postApi = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
