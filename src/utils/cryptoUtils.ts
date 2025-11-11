import { localAssets } from '@assets/assets';
import { FungibleToken } from '@orangecryptohq/orangeseed';
import BigNumber from 'bignumber.js';
import AppConfig from 'react-native-config';

export const truncateAddress = (address: string, startLength = 4, endLength = 4) => {
    if (address.length <= startLength + endLength) return address;
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

// ============================================
// CoinGecko Price Fetching with Caching & Fallback
// ============================================

/**
 * Symbol to CoinGecko ID mapping
 * Based on CoinGecko API v3: https://api.coingecko.com/api/v3/coins/list
 */
const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
    // Major cryptocurrencies
    'BTC': 'bitcoin',
    'STX': 'blockstack',
    'ETH': 'ethereum',
    'DOGE': 'dogecoin',
    'LTC': 'litecoin',
    'BCH': 'bitcoin-cash',

    // BRC-20 Tokens (Bitcoin Ordinals)
    'ORDI': 'ordi',
    'SATS': 'sats-ordinals',
    'RATS': 'rats',
    'PUPS': 'bitcoin-puppets',
    'WZRD': 'wzrd',
    'MUBI': 'mubi',
    '.COM': 'com-token',

    // Stacks Ecosystem
    'ALEX': 'alex-lab',
    'ARKADIKO': 'arkadiko-token',
    'WELSH': 'welsh-corgi-coin',
    'LEO': 'leo-token',
    'USDT': 'tether',
    'USDC': 'usd-coin',
    'WBTC': 'wrapped-bitcoin',

    // Runes (Bitcoin native fungible tokens)
    'UNCOMMON•GOODS': 'uncommon-goods',
    'DECENTRALIZED': 'decentralized',
    'SATOSHI•NAKAMOTO': 'satoshi-nakamoto',
    'WANKO•MANKO•RUNES': 'wanko-manko-runes',
    'RSIC•GENESIS•RUNES': 'rsic-genesis-runes',
};

/**
 * Price cache with TTL
 * Caches prices for 2 minutes to reduce API calls
 */
interface PriceCache {
    price: number;
    timestamp: number;
}

const priceCache: Map<string, PriceCache> = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

/**
 * Rate limiting state
 * CoinGecko free tier: 50 calls/minute
 */
let requestCount = 0;
let requestWindowStart = Date.now();
const MAX_REQUESTS_PER_MINUTE = 45; // Leave buffer for safety
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

/**
 * Check if rate limit is exceeded
 */
const isRateLimited = (): boolean => {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - requestWindowStart > RATE_LIMIT_WINDOW) {
        requestCount = 0;
        requestWindowStart = now;
        return false;
    }

    return requestCount >= MAX_REQUESTS_PER_MINUTE;
};

/**
 * Increment request counter
 */
const incrementRequestCount = () => {
    requestCount++;
};

/**
 * Batch fetch multiple token prices from CoinGecko in a single API call
 * This significantly reduces API calls and improves performance
 *
 * @param symbols - Array of crypto symbols (e.g., ['BTC', 'STX', 'ORDI'])
 * @returns Map of symbol to price in USD
 */
export const fetchPricesBatch = async (symbols: string[]): Promise<Map<string, number>> => {
    const priceMap = new Map<string, number>();

    if (symbols.length === 0) {
        return priceMap;
    }

    try {
        // Filter out symbols we already have cached
        const symbolsToFetch = symbols.filter(symbol => {
            const cached = priceCache.get(symbol);
            if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
                priceMap.set(symbol, cached.price);
                console.log(`[fetchPricesBatch] Using cached price for ${symbol}: $${cached.price}`);
                return false; // Don't fetch
            }
            return true; // Fetch this one
        });

        if (symbolsToFetch.length === 0) {
            console.log('[fetchPricesBatch] All prices from cache');
            return priceMap;
        }

        // Map symbols to CoinGecko IDs
        const coinGeckoIds = symbolsToFetch
            .map(symbol => SYMBOL_TO_COINGECKO_ID[symbol])
            .filter(id => id !== undefined);

        if (coinGeckoIds.length === 0) {
            console.warn('[fetchPricesBatch] No CoinGecko ID mappings found for symbols:', symbolsToFetch);
            // Fallback to individual fetches for unmapped symbols
            for (const symbol of symbolsToFetch) {
                const price = await fetchPrice(symbol);
                if (price !== null) {
                    priceMap.set(symbol, price);
                }
            }
            return priceMap;
        }

        // Try CoinGecko batch API if not rate limited
        if (!isRateLimited()) {
            try {
                incrementRequestCount();
                const idsParam = coinGeckoIds.join(',');
                console.log(`[fetchPricesBatch] Fetching ${coinGeckoIds.length} tokens from CoinGecko: ${idsParam}`);

                const headers: Record<string, string> = {
                    'Accept': 'application/json',
                };

                if (AppConfig.COINGECKO_API_KEY) {
                    headers['x-cg-demo-api-key'] = AppConfig.COINGECKO_API_KEY;
                }

                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd`,
                    {
                        headers,
                        signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined,
                    }
                );

                if (response.ok) {
                    const data = await response.json();

                    // Map CoinGecko IDs back to symbols and cache
                    symbolsToFetch.forEach(symbol => {
                        const coinGeckoId = SYMBOL_TO_COINGECKO_ID[symbol];
                        if (coinGeckoId && data[coinGeckoId]?.usd !== undefined) {
                            const price = data[coinGeckoId].usd;
                            priceMap.set(symbol, price);
                            priceCache.set(symbol, { price, timestamp: Date.now() });
                            console.log(`[fetchPricesBatch] ${symbol}: $${price}`);
                        }
                    });

                    console.log(`[fetchPricesBatch] Successfully fetched ${priceMap.size - (symbols.length - symbolsToFetch.length)} prices`);
                    return priceMap;
                } else if (response.status === 429) {
                    console.warn('[fetchPricesBatch] CoinGecko rate limit hit');
                    requestCount = MAX_REQUESTS_PER_MINUTE;
                }
            } catch (error) {
                console.warn('[fetchPricesBatch] CoinGecko batch error:', error.message);
            }
        }

        // Fallback: fetch individually (but still more efficient than Promise.all with individual fetches)
        console.log('[fetchPricesBatch] Using fallback for remaining tokens');
        for (const symbol of symbolsToFetch) {
            if (!priceMap.has(symbol)) {
                const price = await fetchPrice(symbol);
                if (price !== null) {
                    priceMap.set(symbol, price);
                }
            }
        }

        return priceMap;

    } catch (error) {
        console.error('[fetchPricesBatch] Error:', error);
        return priceMap;
    }
};

/**
 * Fetch price from CoinGecko with fallback to Orange Market Cap
 * Includes caching and rate limiting
 *
 * @param symbol - Crypto symbol (e.g., 'BTC', 'STX', 'ORDI')
 * @returns Price in USD or null if unavailable
 */
export const fetchPrice = async (symbol: string): Promise<number | null> => {
    try {
        // Check cache first
        const cached = priceCache.get(symbol);
        if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
            console.log(`[fetchPrice] Using cached price for ${symbol}: $${cached.price}`);
            return cached.price;
        }

        // Try CoinGecko first if not rate limited
        if (!isRateLimited()) {
            try {
                const coinGeckoId = SYMBOL_TO_COINGECKO_ID[symbol];

                if (coinGeckoId) {
                    incrementRequestCount();
                    console.log(`[fetchPrice] Fetching ${symbol} from CoinGecko (${coinGeckoId})`);

                    // Build headers with API key if available
                    const headers: Record<string, string> = {
                        'Accept': 'application/json',
                    };

                    // Add CoinGecko API key if configured (free tier key provides better rate limits)
                    if (AppConfig.COINGECKO_API_KEY) {
                        headers['x-cg-demo-api-key'] = AppConfig.COINGECKO_API_KEY;
                    }

                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`,
                        {
                            headers,
                            // 10 second timeout
                            signal: AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined,
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const price = data[coinGeckoId]?.usd;

                        if (price !== undefined && price !== null) {
                            // Cache the price
                            priceCache.set(symbol, { price, timestamp: Date.now() });
                            console.log(`[fetchPrice] CoinGecko price for ${symbol}: $${price}`);
                            return price;
                        }
                    } else if (response.status === 429) {
                        console.warn(`[fetchPrice] CoinGecko rate limit hit for ${symbol}`);
                        // Force rate limit for remaining window
                        requestCount = MAX_REQUESTS_PER_MINUTE;
                    }
                } else {
                    console.warn(`[fetchPrice] No CoinGecko ID mapping for ${symbol}`);
                }
            } catch (coinGeckoError) {
                console.warn(`[fetchPrice] CoinGecko error for ${symbol}:`, coinGeckoError.message);
                // Continue to fallback
            }
        } else {
            console.warn(`[fetchPrice] CoinGecko rate limited, using fallback for ${symbol}`);
        }

        // Fallback to Orange Market Cap API
        console.log(`[fetchPrice] Falling back to Orange Market Cap for ${symbol}`);
        const response = await fetch(
            `https://api-orange-marketcap.orangewebservices.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`,
            {
                headers: {
                    'apikey': AppConfig.ORANGE_MARKETCAP_API_KEY,
                },
                // 10 second timeout
                signal: AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined,
            }
        );

        if (response.ok) {
            const data = await response.json();
            const price = data[symbol];

            if (price !== undefined && price !== null) {
                // Cache the price
                priceCache.set(symbol, { price, timestamp: Date.now() });
                console.log(`[fetchPrice] Orange Market Cap price for ${symbol}: $${price}`);
                return price;
            }
        }

        console.error(`[fetchPrice] No price data available for ${symbol}`);
        return null;

    } catch (error) {
        console.error(`[fetchPrice] Error fetching ${symbol} price:`, error);

        // Return cached price if available, even if expired
        const cached = priceCache.get(symbol);
        if (cached) {
            console.log(`[fetchPrice] Using stale cached price for ${symbol}: $${cached.price}`);
            return cached.price;
        }

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

// Image cache to avoid repeated lookups
const imageCache: Map<string, any> = new Map();
const imageOrangeCache: Map<string, any> = new Map();

export const getImageSource = (name: string) => {
  // Check cache first
  if (imageCache.has(name)) {
    return imageCache.get(name);
  }

  const formatString = (str) => str.replace(/[^a-zA-Z0-9]/g, '');
  const result = formatString(name);
  const lowerCaseName = result.trim().toUpperCase(); // Trim and convert to uppercase
  const matchingKey = Object.keys(localAssets).find(
      (key) => key.trim().toUpperCase() === lowerCaseName
  );

  const image = matchingKey ? localAssets[matchingKey] : null;
  imageCache.set(name, image); // Cache the result
  return image;
};

export const getImageSourceOrange = (name: string) => {
  // Check cache first
  if (imageOrangeCache.has(name)) {
    return imageOrangeCache.get(name);
  }

  const formatString = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');
  const formattedName = formatString(name).trim().toUpperCase();
  const matchingKey = Object.keys(localAssets).find(
    (key) => key.trim().toUpperCase() === formattedName + "ORANGE"
  );

  const image = matchingKey ? localAssets[matchingKey] : null;
  imageOrangeCache.set(name, image); // Cache the result
  return image;
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


