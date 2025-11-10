
import { Config } from "@config/Config";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import axios from "axios";
import Toast from 'react-native-toast-message';
import AppConfig from 'react-native-config';
export const filterVisibleTokens = (
  tokenList: any[],
  coinSettings: any[],
  namesToAlwaysShow: string[] = ["Bitcoin", "Orange", "Stacks"]
): any[] => {
  const visibleItems: any[] = [];
  const seenNames = new Set<string>();

  tokenList.forEach((item) => {
    if (seenNames.has(item.name)) return;

    const coinSetting = coinSettings.find((setting) => setting.name === item.name);
    if (namesToAlwaysShow.includes(item.name) || (coinSetting ? coinSetting.visible : true)) {
      visibleItems.push(item);
      seenNames.add(item.name);
    }
  });

  return visibleItems;
};

type GetReceiveAmountParams = {
  exchangeToken: string;
  receiveToken: string;
  exchangeAmount: string;
  address: string;
};


export const getReceiveAmount = async ({
  exchangeToken,
  receiveToken,
  exchangeAmount,
  address,
}: GetReceiveAmountParams): Promise<string> => {
  try {
    const requestData = {
      send_coin_type: String(exchangeToken?.category).toLocaleLowerCase(),
      send_tick: exchangeToken?.ticker,
      receive_coin_type: String(receiveToken?.category).toLowerCase(),
      receive_tick: receiveToken?.category?.toLowerCase() === 'runes'
        ? receiveToken?.name
        : receiveToken?.ticker,
      address,
    };
    console.log(`exchangeToken`, `${JSON.stringify(exchangeToken)}`)
    console.log(`getReceiveAmount`, `${JSON.stringify(receiveToken)}`)
    const response = await axios.post(`${Config.DOTSWAP_BASE_URL}/brc20swap/swap_info`, requestData);

    // Handle API-level errors
    if (!response.data || !response.data.data) {
      const msg = response.data?.msg || "Unknown error from API";
      Toast.show({ type: 'error', text1: msg });
      console.error("API responded with error:", msg);
      return "0.00";
    }

    const apiData = response.data.data;
    console.log("getReceiveAmount response", apiData);

    const tick2_per_tick1 = new BigNumber(apiData.tick2_per_tick1);
    const platformFee = new BigNumber(apiData.platform_service_fee_percent);
    const liquiderFee = new BigNumber(apiData.liquider_service_fee_percent);
    const btcAmount = new BigNumber(exchangeAmount);

    if (
      !tick2_per_tick1.isFinite() ||
      !platformFee.isFinite() ||
      !liquiderFee.isFinite() ||
      !btcAmount.isFinite()
    ) {
      throw new Error("Invalid numeric data in response");
    }

    const totalFeePercent = platformFee.plus(liquiderFee);

    const btcAfterFee = btcAmount.times(new BigNumber(1).minus(totalFeePercent));
    const finalTokenAmount = btcAfterFee.times(tick2_per_tick1);
    return finalTokenAmount.toFixed(8);


  } catch (error: any) {
    let errorMessage = "Failed to calculate receive amount.";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.msg || error.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    Toast.show({ type: 'error', text1: errorMessage });
    return "0.00";
  }
};

export const getFiateValue = async (symbol) => {
  try {
    const response = await fetch(
      `https://api-orange-marketcap.orangewebservices.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`,
      {
        headers: {
          'apikey': AppConfig.ORANGE_MARKETCAP_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data?.[symbol] ?? null;
  } catch (error) {
    console.error('Error fetching fiat value:', error);
    return null;
  }
};
export type RecommendedFees = {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
};

export async function getRecommendedFees(): Promise<RecommendedFees | null> {
  try {
    const response = await fetch('https://mempool.space/api/v1/fees/recommended');

    if (!response.ok) {
      throw new Error('Failed to fetch recommended fees');
    }

    const data: RecommendedFees = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommended fees:', (error as Error).message);
    return null;
  }
}




