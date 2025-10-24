import { localAssets } from '@assets/assets';
import { FungibleToken } from '@orangecryptohq/orangeseed';
import BigNumber from 'bignumber.js';

export const truncateAddress = (address: string, startLength = 4, endLength = 4) => {
    if (address.length <= startLength + endLength) return address;
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  export const fetchPrice = async (symbol) => {
    try {
        const response = await fetch(`https://api.orangemarketcap.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`);
        const data = await response.json();
        return data[symbol]; 
    } catch (error) {
        console.error(`Error fetching ${symbol} price:`, error);
        return null;
    }
};

export const convertBtcToUsd = (btcAmount, btcPrice) => {
    if (!btcPrice) return "0.00";
    const usdValue = parseFloat(btcAmount) * btcPrice;
    return `${usdValue.toFixed(2)}`;
};

export const microStxToStx = async (microStx) => {
  if (!microStx) return "0 STX"; 
  const stx = parseFloat(microStx) / 1_000_000; 
  return `${stx.toFixed(5)}`; 
};


export const fetchStxPrice = async () => {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
      const data = await response.json();
      return data.blockstack.usd; 
  } catch (error) {
      console.error('Error fetching STX price:', error);
      return 0; 
  }
};

export const convertStxToUsd =  (stxBalance, stxPrice) => {
  
  return `${(stxBalance * stxPrice).toFixed(2)}`; 
};

export const convertRunesToUsd =  async (runesBalance, runePrice) => {
  
  return `${(runesBalance * runePrice).toFixed(3)}`; 
};

export const convertBrc20ToUsd =  async (brc20Balance, brc20Price) => {
  
  return `${(brc20Balance * brc20Price).toFixed(3)}`; 
};

export const timeStampToDate = (value: any)=>{
  const date = new Date(value); 
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getFtBalance(ft: FungibleToken) {
  if (ft && ft.decimals) {
    return ftDecimals(ft.balance, ft.decimals);
  }
  return ft?.balance;
}

export function getFtTicker(ft: FungibleToken) {
  if (ft?.ticker) {
    return ft.protocol === 'brc-20' ? ft.ticker.toUpperCase() : ft.ticker;
  }
  if (ft?.name) {
    return getTicker(ft.name).toUpperCase();
  }else {
    return getTicker(ft.assetName).toUpperCase();
  }
  return '';
}

 function initBigNumber(num: string | number | BigNumber) {
  return BigNumber.isBigNumber(num) ? num : new BigNumber(num);
 }

function ftDecimals(value: number | string | BigNumber, decimals: number): string {
  const amount = initBigNumber(value);
  return amount.shiftedBy(-decimals).toString();
}

export function getTicker(name: string) {
  if (name.includes('-')) {
    const parts = name.split('-');
    if (parts.length >= 3) {
      return `${parts[0][0]}${parts[1][0]}${parts[2][0]}`;
    }
    return `${parts[0][0]}${parts[1][0]}${parts[1][1]}`;
  }
  if (name.length >= 3) {
    return `${name[0]}${name[1]}${name[2]}`;
  }
  return name;
}

export const getImageSource = async (name: string) => {

  const formatString = (str) => str.replace(/[^a-zA-Z0-9]/g, ''); 
  const result = formatString(name);
  const lowerCaseName = result.trim().toUpperCase(); // Trim and convert to uppercase
  const matchingKey = Object.keys(localAssets).find(
      (key) => key.trim().toUpperCase() === lowerCaseName
  );

  console.log("getImageSource "+name , matchingKey);
  return matchingKey ? localAssets[matchingKey] : null;
};

export const getImageSourceOrange = async (name: string) => {
  const formatString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, ''); 
  const formattedName = formatString(name).trim().toUpperCase();
  const matchingKey = Object.keys(localAssets).find(
    (key) => key.trim().toUpperCase() === formattedName + "ORANGE"
  );
  return matchingKey ? localAssets[matchingKey] : null;
};

export const formatNumber = (value) => {
  const num = Number(value); 

  if (isNaN(num)) {
    return "Invalid Number";
  }

  return num < 1 ? num.toString() : num.toFixed(2);
};

export const formatCurrencyWithCommas = (
  value: string | number,
  options?: {
    currencySymbol?: string;
    decimals?: number;
  }
): string => {


  console.log('formatCurrencyWithCommas', value)
  const { currencySymbol = '$', decimals = 4 } = options || {}; 

  const numericString =
    typeof value === 'string'
      ? value.replace(/[^0-9.-]/g, '')
      : value.toString();

  const amount = parseFloat(numericString);

  if (isNaN(amount)) return `${currencySymbol}0.0000`;

  const fixed = amount.toFixed(2);
  const [integerPart, decimalPart] = fixed.split('.');
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${currencySymbol}${withCommas}${decimals > 0 ? `.${decimalPart}` : ''}`;
};


