import { localAssets } from '@assets/assets';
import { microstacksToStx, satsToBtc } from '@orangecryptohq/orangeseed';
import { store } from '@redux/store';
import { convertBtcToUsd, convertStxToUsd, fetchPrice, getFtBalance, getFtTicker, getImageSource, getImageSourceOrange, getTicker, microStxToStx } from '@utils/cryptoUtils';
import BigNumber from 'bignumber.js';

const coinSettings = [
    { id: "1", category: "Stacks", name: "ALEX LABS", visible: false },
    { id: "2", category: "Stacks", name: "Bridged USDT", visible: false },
    { id: "3", category: "Stacks", name: "Wrapped Bitcoin", visible: false },
    { id: "4", category: "Stacks", name: "Wrapped USDC", visible: false },
    { id: "5", category: "Stacks", name: "ARKADIKO", visible: false },
    { id: "6", category: "Stacks", name: "WELSHCORGI", visible: false },
    { id: "7", category: "Stacks", name: "LEO", visible: false },
    { id: "8", category: "Stacks", name: "Stacking DAO", visible: false },
    { id: "9", category: "BRC20", name: "ORDI", visible: false },
    { id: "10", category: "BRC20", name: "SATS", visible: false },
    { id: "11", category: "BRC20", name: "PUPS", visible: false },
    { id: "12", category: "BRC20", name: "WZRD", visible: false },
    { id: "13", category: "BRC20", name: "MUBI", visible: false },
    { id: "14", category: "BRC20", name: "RATS", visible: false },
    { id: "15", category: "BRC20", name: ".COM", visible: false },
    { id: "16", category: "Runes", name: "UNCOMMON•GOODS", visible: false },
    { id: "17", category: "Runes", name: "DECENTRALIZED", visible: false },
    { id: "18", category: "Runes", name: "SATOSHI•NAKAMOTO", visible: false },
    { id: "19", category: "Runes", name: "WANKO•MANKO•RUNES", visible: false },
    { id: "20", category: "Runes", name: "RSIC•GENESIS•RUNES", visible: false },
  ]
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

    // Default Tokens
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
                type:'Stacks',
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


    let addParnterTokens = coinSettings.map((item) => {
        if (item.category === 'Runes') {
            return {
                ...item,
                balance: '0.00',
                total_sent: '0.00',
                total_received: '0.00',
                tokenFiatRate: '0.00',
                ticker: getTicker(item.name),
                protocol: 'runes',
            };
        } else if (item.category === 'Stacks') {
            return {
                ...item,
                balance: '0.00',
                total_sent: '0.00',
                total_received: '0.00',
                tokenFiatRate: '0.00',
                ticker: getTicker(item.name),
                protocol: 'stacks',
                type:'Stacks',
            };
        } else if (item.category === 'BRC20') {
            return {
                ...item,
                balance: '0.00',
                total_sent: '0.00',
                total_received: '0.00',
                tokenFiatRate: '0.00',
                ticker: getTicker(item.name),
                protocol: 'brc-20',
               
            };
        }
        return item;
    });
    

    
    // Tokens get from Token List
    const userTokens = [
        ...stacksTokens.map(token => ({
            ...token,
            category: 'Stacks',
            type:'SIP-10',
            balance: microstacksToStx(new BigNumber(token.balance)),
            name: token.assetName,
            ticker: getFtTicker(token),
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

    console.log('createTokenArray', `updatedCryptoArray ${JSON.stringify(updatedCryptoArray)}`)
    console.log('createTokenArray', `userTokens ${JSON.stringify(userTokens)}`)
    console.log('createTokenArray', `addParnterTokens ${JSON.stringify(addParnterTokens)}`)
   
    


    let finalCryptoArray = [...updatedCryptoArray,...userTokens,...addParnterTokens];



    console.log('createTokenArray', `finalCryptoArray ${JSON.stringify(finalCryptoArray)}`)
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
    console.log('createTokenArray', `newCryptoArray ${JSON.stringify(newCryptoArray)}`)
    return { newCryptoArray, totalBalance, btcPrice, stxPrice };
};


export const getCardItems = (cryptoArray) => {
    
    console.log('getCardItems cryptoArray', cryptoArray)
    const totalFiatRate = cryptoArray.reduce((acc, item) => {
        return acc + (parseFloat(item.tokenFiatRate) || 0);
    }, 0);

    const newItem = {
        id: 1,
        image: localAssets.walletbalance,
        name: "all",
        category: "USD",
        assetCount: cryptoArray.length,
        balance: `$${totalFiatRate.toFixed(5)}`,
        total_sent: "0.00",
        total_received: "0.00",
        tokenFiatRate: totalFiatRate,
        protocol: "all"
    };

    return [newItem, ...cryptoArray];
};
const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


export const updateCoinSettingList = async (newCryptoArray) => {
    console.log('updateCoinSettingList - newCryptoArray:', newCryptoArray);

    const coinSettings = store.getState().coinSettingsSlice.coinSettings;
    const namesToRemove = new Set(["Bitcoin", "Orange", "Stacks"]); 
    const existingNames = new Set(coinSettings.map(coin => coin.name)); 

    const mappedCoinSettings = newCryptoArray.map(({ id, category, name, visible }) => ({
        id,
        category,
        name,
        visible
    }));

    const filteredCoinSettings = mappedCoinSettings.filter(
        item => !namesToRemove.has(item.name) && !existingNames.has(item.name) 
    );

    console.log('updateCoinSettingList - filteredCoinSettings:', JSON.stringify(filteredCoinSettings));

    return filteredCoinSettings;
};


