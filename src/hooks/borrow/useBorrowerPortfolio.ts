import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { store, useAppDispatch } from '@redux/store';
import { Config } from '@config/Config';
import { useAuthLiquidium } from './useAuthLiquidium';
import { Dispatch } from '@reduxjs/toolkit';
import { setLiquidiumToken } from '@redux/slice/appReducer';
import { ApiError, PortfolioResponse } from '@services/network/ApiResponce';

export const useBorrowerPortfolio = () => {
  const { getAuthToken } = useAuthLiquidium();

  const [data, setData] = useState<PortfolioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const dispatch: Dispatch = useAppDispatch();
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    const initialToken = store.getState().appReducer.liquidiumToken;
    const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/portfolio`;

    const fetchData = async (token: string): Promise<PortfolioResponse> => {
      const response = await axios.get<PortfolioResponse>(url, {
        headers: {
          Authorization: `Bearer ${Config.LIQUIDIUM_API_KEY}`,
          'Content-Type': 'application/json',
          'x-user-token': token,
        },
      });
      return response.data;
    };

    try {
      const responseData = await fetchData(initialToken);
      setData(responseData);
      return responseData;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      const status = axiosError?.response?.status;

      if (status === 401) {
        try {
          const refreshedToken = await getAuthToken();
          if (!refreshedToken) throw new Error('Token refresh failed');

          const responseData = await fetchData(refreshedToken?.user_jwt);
          dispatch(setLiquidiumToken(refreshedToken?.user_jwt))
          setData(responseData);
          return responseData;
        } catch (refreshErr: any) {
          const refreshError = refreshErr as AxiosError<ApiError>;
          const errorResponse = refreshError.response?.data;

          setIsError(true);
          setError({
            error: errorResponse?.error || 'UNKNOWN_ERROR',
            errorMessage: errorResponse?.errorMessage || 'Unknown error occurred',
            status: refreshError.response?.status || 500,
          });
          throw refreshErr;
        }
      } else {
        const errorResponse = axiosError.response?.data;
        setIsError(true);
        setError({
          error: errorResponse?.error || 'UNKNOWN_ERROR',
          errorMessage: errorResponse?.errorMessage || 'Unknown error occurred',
          status: status || 500,
        });
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  }, [getAuthToken]);

  return {
    fetchPortfolio,
    data,
    isLoading,
    isError,
    error, 
  };
};
