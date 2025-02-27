import { localAssets } from '@assets/assets';
import { btcToSats, microstacksToStx, satsToBtc } from '@orangecryptohq/orangeseed';
import { convertBtcToUsd, convertStxToUsd, fetchPrice, fetchStxPrice, getFtBalance, getFtTicker, getImageSource, getImageSourceOrange, getTicker, microStxToStx } from '@utils/cryptoUtils';
import BigNumber from 'bignumber.js';

export const createTokenArray = async (
    btcBalance, 
    stxBalance, 
    brc20Tokens, 
    runesTokens, 
    stacksTokens, 
    prevArray
) => {
    // Fetch BTC and STX prices in parallel
    const [btcPrice, stxPrice] = await Promise.all([
        fetchPrice('BTC'),
        fetchPrice('STX')
    ]);

    const stx = await microStxToStx(stxBalance.balance);

    const btcTokenFiatRate = convertBtcToUsd(
        satsToBtc(new BigNumber(btcBalance?.finalBalance)).toNumber(),
        btcPrice
    );

    const stxTokenFiatRate = convertStxToUsd(stx, stxPrice);
    const totalBalance = ((parseFloat(btcTokenFiatRate) || 0) + (parseFloat(stxTokenFiatRate) || 0)).toFixed(2);

    // Update previous crypto array
    const updatedCryptoArray = prevArray.map(item => {
        if (item.category === 'BTC') {
            return {
                ...item,
                image: localAssets.bitcoincard,
                balance: satsToBtc(new BigNumber(btcBalance?.finalBalance)).toString(),
                total_sent: btcBalance?.totalSent?.toString(),
                total_received: btcBalance?.totalReceived?.toString(),
                tokenFiatRate: btcTokenFiatRate,
                protocol: 'btc',
                ticker: 'BTC',
            };
        } else if (item.category === 'Stacks') {
            return {
                ...item,
                image: localAssets.stackscard,
                balance: stx,
                total_sent: stxBalance?.availableBalance?.toString(),
                total_received: stxBalance?.availableBalance?.toString(),
                tokenFiatRate: stxTokenFiatRate,
                protocol: 'stacks',
                ticker: 'STX',
            };
        } else if (item.category === 'BRC20') {
            return {
                ...item,
                image: localAssets.orangetransaction,
                balance: '0.00',
                total_sent: '0.00',
                total_received: '0.00',
                tokenFiatRate: '0.00',
                protocol: 'brc-20',
                ticker: getFtTicker(item),
            };
        }
        return item;
    });

    // Create additional tokens array
    const additionalTokens = [
        ...stacksTokens.map(token => ({
            ...token,
            category: 'Stacks',
            balance: microstacksToStx(new BigNumber(token.balance)),
            name: token.assetName,
            id: generateUniqueId(),
            tokenFiatRate: convertStxToUsd(microstacksToStx(new BigNumber(token.balance)), stxPrice),
        })),
        ...runesTokens.map(token => ({
            ...token,
            category: 'Runes',
            balance: getFtBalance(token),
            ticker: getFtTicker(token),
            id: generateUniqueId(),
            tokenFiatRate: '0.00',
        })),
        ...brc20Tokens.map(token => ({
            ...token,
            balance: getFtBalance(token),
            category: 'BRC20',
            id: generateUniqueId(),
            tokenFiatRate: '0.00',
        })),
    ];

    // Merge updatedCryptoArray and additionalTokens
    const finalCryptoArray = [...updatedCryptoArray, ...additionalTokens];

    // Fetch missing token fiat rates & icons in parallel
    const newCryptoArray = await Promise.all(
        finalCryptoArray.map(async (item) => {
            const updates = { ...item };

            if (item.tokenFiatRate === "0.00") {
                let price = await fetchPrice(item.ticker.trim());
                updates.tokenFiatRate = ((price && !isNaN(price)) ? parseFloat(item.balance) * price : 0).toFixed(2);
            }

            updates.image = await getImageSourceOrange(item.name);
            updates.icon = await getImageSource(item.name);
            return updates;
        })
    );

    return { newCryptoArray, totalBalance, btcPrice, stxPrice };
};


const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


