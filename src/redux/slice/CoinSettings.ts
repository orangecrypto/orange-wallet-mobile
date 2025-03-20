import { createSlice } from '@reduxjs/toolkit';

export interface CoinSettingsItem {
  id: string;
  category: string;
  name: string;
  visible: boolean;
}

export interface CoinSettingsState {
  coinSettings: CoinSettingsItem[];
}

const initialState: CoinSettingsState = {
  coinSettings: [
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
  ],
};

export const coinSettingsSlice = createSlice({
    name: 'coinSettingsSlice',
    initialState,
    reducers: {
      updateCoinStatus: (state, action) => {
        const { name, visible } = action.payload;
        const token = state.coinSettings.find((item) => item.name === name);
        if (token) {
          token.visible = visible; 
        }
      },

      setAddCoinSettings: (state, action) => {
        state.coinSettings = [...state.coinSettings, ...action.payload];
      },
      resetCoinNames: (state) => {
        state.coinSettings = initialState.coinSettings.map((initialItem) => {
          // Find existing item in current state
          const existingItem = state.coinSettings.find(item => item.name === initialItem.name);
          
          return {
            ...initialItem,
            visible: existingItem ? existingItem.visible : initialItem.visible, // Preserve visibility setting
          };
        });
      },
     
      clearCoinSettings: () => initialState,
    },
  });

export const { updateCoinStatus, clearCoinSettings, setAddCoinSettings, resetCoinNames } =
coinSettingsSlice.actions;

export default coinSettingsSlice.reducer;
