/* eslint-disable no-unused-vars */
import axios from 'axios';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { store } from '../../redux/store';

export type METHOD = 'post' | 'get' | 'put' | 'delete' | 'patch';

export interface IError {
  errorMessage: string;
  errorCode: number;
}

export interface Response<T> {
  data: T;
  status?: number;
  success?: number;
  message: string;
  error: [string];
  error_code: unknown;
}

interface Config {
  baseUrl?: string;
  params?: unknown;
  endPoint: string;
  method?: METHOD;
  forceLive?: boolean;
  headers?: unknown;
  timeout?: number;
  token?: string;
  companyId?: string;
  requestId?: number;
  body?: unknown;
}

export const apiService = async <T>(
  apiConfig: Config,
  onSuccess: (res: T) => void,
  onFailure: (error: IError) => void,
) => {
  // Curlirize(axios);

  const currentDate = new Date().getTime();
  const requestId = currentDate;

  const endpoint = apiConfig.endPoint;

  const params: unknown = apiConfig.params || {};
  const method: METHOD = apiConfig.method || 'post';

  const baseURL = apiConfig.baseUrl;

  const isConnected: NetInfoState = await NetInfo.fetch();
  const token = store.getState().appReducer

  if (isConnected) {
    let headers = {
      Authorization: token ? `Bearer ${token}` : '',
      RequestID: requestId,
    };

    if (apiConfig.headers) {
      headers = { ...headers, ...apiConfig.headers };
    }

    const reqConfig = {
      baseURL,
      headers,
      params,
      timeout: apiConfig.timeout || 60000,
    };
    const request = (): Promise<any> => {
      switch (method) {
        case 'post':
          return axios.post(endpoint, params, reqConfig);
        case 'get':
          return axios.get(endpoint, reqConfig);
        case 'delete':
          return axios.delete(endpoint, reqConfig);
        case 'put':
          return axios.put(endpoint, params, reqConfig);
        case 'patch':
          return axios.put(endpoint, params, reqConfig);
        default:
          break
      }
      return new Promise((resolve) => resolve({}));
    };

    request()
      .then((response: { status: number; data: any; }) => {
        if (
          (response.status === 200 ||
            response.status === 201 ||
            response.status === 204 ||
            response.data) &&
          response.data !== ''
        ) {
          onSuccess(response.data ? response.data : response.data);
        } else if (response.status === 200 || response.status === 204) {
          onSuccess(response.data ? response.data : response.data)
        } else {
          // Provide Error based on response so Need to setup the error message
          onFailure({
            errorCode: 200,
            errorMessage: response.data.error[0] || 'Something went wrong',
          });
        }
      }).catch((error) => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              // Alert Dialog Popup Session Expired
              onFailure({
                errorCode: -1,
                errorMessage:
                  error.response.data && typeof error.response.data.data
                    ? error.response.data.data.message
                    : 'Session expired',
              });
              break;
            case 404:
              onFailure({
                errorCode: -1,
                errorMessage:
                  error && typeof error === 'string'
                    ? error
                    : 'Something went wrong',
              });
              break;
            default:
              onFailure({
                errorCode: 0,
                errorMessage:
                  error.response.data && typeof error === 'string'
                    ? error
                    : 'Something went wrong',
              });
              break;
          }
        } else {
          onFailure({ errorMessage: error.toString(), errorCode: -1 })
        }
      })
  } else {
    onFailure({
      errorCode: 0,
      errorMessage: 'Please check your internet connection',
    });
  }
}
