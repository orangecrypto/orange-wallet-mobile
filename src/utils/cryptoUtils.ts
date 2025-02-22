export const truncateAddress = (address: string, startLength = 4, endLength = 4) => {
    if (address.length <= startLength + endLength) return address;
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  export const fetchBtcPrice = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await response.json();
        return data.bitcoin.usd; 
    } catch (error) {
        console.error("Error fetching BTC price:", error);
        return null;
    }
};

export const convertBtcToUsd = (btcAmount, btcPrice) => {
    if (!btcPrice) return "$0.00";
    const usdValue = parseFloat(btcAmount) * btcPrice;
    return `${usdValue.toFixed(2)}`;
};

export const microStxToStx = async (microStx) => {
  if (!microStx) return "0 STX"; 
  const stx = parseFloat(microStx) / 1_000_000; 
  return `${stx.toFixed(2)}`; 
};


export const fetchStxPrice = async () => {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
      const data = await response.json();
      return data.blockstack.usd; // STX price in USD
  } catch (error) {
      console.error('Error fetching STX price:', error);
      return 0; // Return 0 in case of an error
  }
};

export const convertStxToUsd =  (stxBalance, stxPrice) => {
  
  return `${(stxBalance * stxPrice).toFixed(2)}`; 
};