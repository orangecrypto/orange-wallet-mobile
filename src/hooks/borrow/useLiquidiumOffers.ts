import { useState, useCallback } from 'react'
import axios from 'axios'
import { Config } from '@config/Config'
import { useAuthLiquidium } from './useAuthLiquidium'
import { store, useAppDispatch } from '@redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { setLiquidiumToken } from '@redux/slice/appReducer'
import AppConfig from 'react-native-config';

interface OfferParams {
  runeId: string
  runeAmount: number
}

export const useLiquidiumOffers = () => {
  const { getAuthToken } = useAuthLiquidium()

  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)

  const dispatch: Dispatch = useAppDispatch();
  const getOffer = useCallback(async ({ runeId, runeAmount }: OfferParams) => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    const initialToken = store.getState().appReducer.liquidiumToken

    const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/collateral/runes/${runeId}/offers?rune_amount=${runeAmount}`

    const fetchData = async (token: string) => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
          'Content-Type': 'application/json',
          'x-user-token': token,
        },
      })
      return response.data
    }

    try {
      const responseData = await fetchData(initialToken)
      console.log('useLiquidiumOffers',`initialToken : ${initialToken}`)
      setData(responseData)
      return responseData
    } catch (err: any) {
      const status = err?.response?.status
      console.log('responseData', status)
      if (status === 401) {
        try {
          const refreshedToken = await getAuthToken()

          console.log('responseData', refreshedToken)
          if (!refreshedToken) throw new Error('Token refresh failed')

          const responseData = await fetchData(refreshedToken?.user_jwt)
          dispatch(setLiquidiumToken(refreshedToken?.user_jwt))
          setData(responseData)
          return responseData
        } catch (refreshErr) {
          setIsError(true)
          setError(refreshErr)
          throw refreshErr
        }
      } else {
        setIsError(true)
        setError(err)
        throw err
      }
    } finally {
      setIsLoading(false)
    }
  }, [getAuthToken])

  return {
    getOffer,
    data,
    isLoading,
    isError,
    error,
  }
}

