import { localAssets } from '@assets/assets';
import { btcToSats, microstacksToStx, satsToBtc } from '@orangecryptohq/orangeseed';
import { convertBtcToUsd, convertStxToUsd, fetchPrice, fetchStxPrice, getFtBalance, getFtTicker, microStxToStx } from '@utils/cryptoUtils';
import BigNumber from 'bignumber.js';

export const createTokenArray = async (btcBalance, stxBalance, brc20Tokens, runesTokens, stacksTokens, prevArray) => {
    const btcPrice = await fetchPrice('BTC');
    const stxPrice = await fetchPrice('STX');
    const stx = await microStxToStx(stxBalance.balance);

    const btcTokenFiatRate = convertBtcToUsd(
        satsToBtc(new BigNumber(btcBalance?.finalBalance)).toNumber(),
        btcPrice
    );

    const stxTokenFiatRate = convertStxToUsd(stx, stxPrice);
    const totalBalance = ((parseFloat(btcTokenFiatRate) || 0) + (parseFloat(stxTokenFiatRate) || 0)).toFixed(2);

    const updatedCryptoArray = prevArray.map(item =>
        item.category === 'BTC'
            ? {
                ...item,
                image: localAssets.bitcoincard,
                balance: satsToBtc(new BigNumber(btcBalance?.finalBalance)).toString(),
                total_sent: btcBalance?.totalSent?.toString(),
                total_received: btcBalance?.totalReceived?.toString(),
                tokenFiatRate: btcTokenFiatRate,
                protocol: 'btc'
            }
            : item.category === 'Stacks'
                ? {
                    ...item,
                    image: localAssets.stackscard,
                    balance: stx,
                    total_sent: stxBalance?.availableBalance?.toString(),
                    total_received: stxBalance?.availableBalance?.toString(),
                    tokenFiatRate: stxTokenFiatRate,
                    protocol: 'stacks',
                 }
            : item.category === 'BRC20' ? {
                        ...item,
                        image: localAssets.orangetransaction,
                        balance: '0.00',
                        total_sent:'0.00' ,
                        total_received: '0.00',
                        tokenFiatRate: '0.00',
                        protocol: 'brc-20'
                    }
                
            : item
    );

    const additionalTokens = [
        ...stacksTokens.map(token => ({
            ...token,
            category:'Stacks',
            balance: microstacksToStx(new BigNumber(token.balance)),
            name:token.assetName,
            id: generateUniqueId(),
            tokenFiatRate: convertStxToUsd(microstacksToStx(new BigNumber(token.balance)), stxPrice)
        })),
        ...runesTokens.map(token => ({
            ...token,
            category:'Runes',
            balance: getFtBalance(token),
            ticker: getFtTicker(token),
            id:generateUniqueId(),
            tokenFiatRate: '0.00'
        })),
        ...brc20Tokens.map(token => ({
            ...token,
            balance: getFtBalance(token),
            category:'BRC20',
            id: generateUniqueId(),
            tokenFiatRate: '0.00'
        }))
    ];
    
    // Final merged array
    const finalCryptoArray = [...updatedCryptoArray, ...additionalTokens];
    return { finalCryptoArray, totalBalance, btcPrice, stxPrice };
};

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


