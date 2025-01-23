import { ApiResponseModel } from './ApiResponseModel';
import { postApiCall } from './ApiCall';
import { IError } from './ApiService';

export const BASE_URL = process.env.API_BASE_URL;

export namespace END_POINTS {
  export const GET_TOKEN = 'get-token';
  export const LOGIN = 'auth/login';
  export const LOGOUT = 'logout ';
}

export interface ResponseModel<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default class ApiHelper {
  static Login = (params: { username: string; password: string }) => new Promise<ResponseModel<ApiResponseModel.Login.LoginData> | undefined>(
      (resolve) => postApiCall(
          BASE_URL,
          END_POINTS.LOGIN,
          params,
          (data: ApiResponseModel.Login.Response) => resolve({
              data: data.data.data,
              error: undefined,
              success: true,
            }),
          (error: IError) => resolve({
              data: undefined,
              error: error.errorMessage,
              success: false,
            }),
        ),
    );

    static Logout = () => new Promise<ResponseModel<ApiResponseModel.Logout.LogoutData> | undefined>(
        (resolve) => postApiCall(
            BASE_URL,
            END_POINTS.LOGOUT,
            {},
            (data: ApiResponseModel.Logout.Response) => resolve({
                data: data.data.data,
                error: undefined,
                success: true,
              }),
            (error: IError) => resolve({
                data: undefined,
                error: error.errorMessage,
                success: false,
              })
          )
      );

}
