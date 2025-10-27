export enum Config {
    LIQUIDIUM_BASE_URL='https://alpha.liquidium.wtf',
    DOTSWAP_BASE_URL='https://api.dotswap.app',
    RUNEDEX_BASE_URL='https://app.runesdex.com',
}

// Debug logging flag - only enable in development when explicitly needed
// Set to true to enable verbose network logging for debugging
export const DEBUG_NETWORK_LOGGING = __DEV__ && false;
