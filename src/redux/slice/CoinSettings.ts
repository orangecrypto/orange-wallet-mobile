import { createSlice } from '@reduxjs/toolkit';

export interface CoinSettingsItem {
  id: number;
  category: string;
  name: string;
  isEnable: boolean;
}

export interface CoinSettingsState {
  coinSettings: CoinSettingsItem[];
}

const initialState: CoinSettingsState = {
  coinSettings: [
    { id: 1, category: "Stacks", name: "ALEX LABS", isEnable: false },
    { id: 2, category: "Stacks", name: "Bridged USDT", isEnable: false },
    { id: 3, category: "Stacks", name: "Wrapped Bitcoin", isEnable: false },
    { id: 4, category: "Stacks", name: "Wrapped USDC", isEnable: false },
    { id: 5, category: "Stacks", name: "ARKADIKO", isEnable: false },
    { id: 6, category: "Stacks", name: "WELSHCORGI", isEnable: false },
    { id: 7, category: "Stacks", name: "LEO", isEnable: false },
    { id: 8, category: "Stacks", name: "Stacking DAO", isEnable: false },
    { id: 9, category: "BRC20", name: "ORDI", isEnable: false },
    { id: 10, category: "BRC20", name: "SATS", isEnable: false },
    { id: 11, category: "BRC20", name: "PUPS", isEnable: false },
    { id: 12, category: "BRC20", name: "WZRD", isEnable: false },
    { id: 13, category: "BRC20", name: "MUBI", isEnable: false },
    { id: 14, category: "BRC20", name: "RATS", isEnable: false },
    { id: 15, category: "BRC20", name: ".COM", isEnable: false },
    { id: 16, category: "Runes", name: "UNCOMMON•GOODS", isEnable: false },
    { id: 17, category: "Runes", name: "DECENTRALIZED", isEnable: false },
    { id: 18, category: "Runes", name: "SATOSHI•NAKAMOTO", isEnable: false },
    { id: 19, category: "Runes", name: "WANKO•MANKO•RUNES", isEnable: false },
    { id: 20, category: "Runes", name: "RSIC•GENESIS•RUNES", isEnable: false },
  ],
};

export const coinSettingsSlice = createSlice({
    name: 'coinSettingsSlice',
    initialState,
    reducers: {
      updateCoinStatus: (state, action) => {
        const { id, isEnable } = action.payload;
        const token = state.coinSettings.find((item) => item.id === id);
        if (token) {
          token.isEnable = isEnable; 
        }
      },
     
      clearCoinSettings: () => initialState,
    },
  });

export const { updateCoinStatus, clearCoinSettings } =
coinSettingsSlice.actions;

export default coinSettingsSlice.reducer;
