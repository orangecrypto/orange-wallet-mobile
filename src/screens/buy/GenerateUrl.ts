import axios from 'axios';
import { ApiEndpoints } from '@services/network/ApiEndpoints';
import { getMoonPaySignedUrl } from '@orangecryptohq/orangeseed';
import { Config } from '@config/Config';

export const getCoinBaseUrl = async (address) => {
    try {
        const response = await axios.post(`${ApiEndpoints.CDPTOKEN}`, { address });
        const tokenData = response.data;
        
        let coinBaseUrl = null;
        if (tokenData && tokenData.token) {
            coinBaseUrl = new URL(`${ApiEndpoints.COINBASE_BASE_URL}/buy/select-asset`);
            coinBaseUrl.searchParams.set('sessionToken', tokenData.token);
        }
        
        console.log('getCoinBaseUrl', tokenData, coinBaseUrl?.toString());
        return coinBaseUrl ? coinBaseUrl.toString() : null;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch coin base url');
    }
};

export const getMoonPayUrl = async (address, networkType) => {
    try {
        const moonPayUrl = new URL(ApiEndpoints.MOONPAY_BUY_URL);
        moonPayUrl.searchParams.append('apiKey', Config.MOONPAY_API_KEY);
        moonPayUrl.searchParams.append('currencyCode', 'USD');
        moonPayUrl.searchParams.append('walletAddress', address);
        moonPayUrl.searchParams.append('colorCode', '#5546FF');
        const signedUrl = await getMoonPaySignedUrl(networkType, moonPayUrl.href);
        if (!signedUrl) throw new Error('Failed to get signed MoonPay URL');
        return signedUrl.signedUrl;
       
    } catch (error) {
        
        console.log('getMoonPayUrl', error)
    }
};

export const getTanStackUrl = async (address) => {
    try {
        const transakUrl = new URL(ApiEndpoints.TRANSAK_URL);
        transakUrl.searchParams.append('apiKey', Config.TRANSAK_API_KEY as string);
        transakUrl.searchParams.append('cryptoCurrencyList', 'USD');
        transakUrl.searchParams.append('defaultCryptoCurrency', 'USD');
        transakUrl.searchParams.append('walletAddress', address);
        transakUrl.searchParams.append('disableWalletAddressForm', 'true');
        transakUrl.searchParams.append(
          'exchangeScreenTitle',
          `${'BUY'} ${'USD'}`,
        );
        transakUrl.searchParams.append('productsAvailed', 'Buy');
      
        return transakUrl.toString();
       
    } catch (error) {
        
        console.log('getMoonPayUrl', error)
    }
};

