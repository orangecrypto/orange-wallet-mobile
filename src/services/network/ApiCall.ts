/* eslint-disable no-unused-vars */
import { IError, apiService } from './ApiService';

export const getApiCall = async (
  baseUrl: string,
  endpoint: string,
  params: any,
  result: (data: any) => void,
  error: (error: IError) => void,
) => {
  await apiService(
    {
      baseUrl,
      endPoint: endpoint,
      method: 'get',
      params,
    },
    (result1: any) => {
      result({data: result1});
    },
    (error1: IError) => {
      error(error1);
    },
  );
};

export const postApiCall = async (
  baseUrl: string,
  endpoint: string,
  params: any,
  result: (data: any) => void,
  error: (error: IError) => void,
) => {
  await apiService(
    {
      baseUrl,
      endPoint: endpoint,
      method: 'post',
      params,
    },
    (result1: any) => {
      result({data: result1});
    },
    (error1: IError) => {
      error(error1);
    },
  );
};

export const putApiCall = async (
  baseUrl: string,
  endpoint: string,
  params: any,
  result: (data: any) => void,
  error: (error: IError) => void,
) => {
  await apiService(
    {
      baseUrl,
      endPoint: endpoint,
      method: 'put',
      params,
    },
    (result1: any) => {
      result({data: result1});
    },
    (error1: IError) => {
      error(error1);
    },
  );
};

export const deleteApiCall = async (
  baseUrl: string,
  endpoint: string,
  params: any,
  result: (data: any) => void,
  error: (error: IError) => void,
) => {
  await apiService(
    {
      baseUrl,
      endPoint: endpoint,
      method: 'delete',
      params,
    },
    (result1: any) => {
      result({data: result1});
    },
    (error1: IError) => {
      error(error1);
    },
  );
};

export const patchApiCall = async (
  baseUrl: string,
  endpoint: string,
  params: any,
  result: (data: any) => void,
  error: (error: IError) => void,
) => {
  await apiService(
    {
      baseUrl,
      endPoint: endpoint,
      method: 'patch',
      params,
    },
    (result1: any) => {
      result({data: result1});
    },
    (error1: IError) => {
      error(error1);
    },
  );
};
