import { satsToBtc } from '@orangecryptohq/orangeseed';
import BigNumber from 'bignumber.js';
import AppConfig from 'react-native-config';
import { Config } from '@config/Config';

export const getFiateValue = async (value: string | number, symbol = 'BTC'): Promise<string > => {
  try {
    const finalValue: any = satsToBtc(new BigNumber(value));
    const response = await fetch(
      `https://api.orangemarketcap.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`
    );
    const data = await response.json();
    const price = data?.[symbol];

    if (price) {
      const fiatValue = finalValue * price;
      return fiatValue.toFixed(2).toString(); // ensures 2 decimal points and returns a string
    }

    return '0';
  } catch (error) {
    console.error('Error fetching fiat value:', error);
    return '0';
  }
};

export const getRemainingTime =async (endDateISOString: string): Promise<string> => {
  const endDate = new Date(endDateISOString);
  const now = new Date();

  const diffMs = endDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return '0d 0h'; // already passed
  }

  const diffInHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffInHours / 24);
  const hours = diffInHours % 24;

  return `${days}d ${hours}h`;
};

export const getTimeProgressPercentage = async(endDateISOString: string, totalDays: number): Promise<number> => {
  const endDate = new Date(endDateISOString);
  const totalMs = totalDays * 24 * 60 * 60 * 1000;

  const startDate = new Date(endDate.getTime() - totalMs);
  const now = new Date();

  const elapsedMs = now.getTime() - startDate.getTime();
  const percentage = (elapsedMs / totalMs) * 100;

  console.log('getTimeProgressPercentage', percentage)
  if (percentage < 0) return 0;
  if (percentage > 100) return 100;

  return Math.round(percentage); 
};

export const fetchRuneCollateral = async (runeId: string, liquidiumToken: string) => {
     try {
            const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/collateral/runes/${runeId}`;

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization:  `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
                    'Content-Type': 'application/json',
                    'x-user-token': liquidiumToken,
                },
            }); 
            const data = await res.json();
            return data
        } catch (error) {
            if (error.response) {
                console.error('API Error:', error.response.status, error.response.data);
            } else {
                console.error('Fetch Error:', error.message);
            }
        }
};
