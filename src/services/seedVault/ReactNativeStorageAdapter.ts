import { StorageAdapter } from "@orangecryptohq/orangeseed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ReactNativeStorageAdapter: StorageAdapter = {
  get: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error("AsyncStorage get error:", e);
      return null;
    }
  },
  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("AsyncStorage set error:", e);
    }
  },
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("AsyncStorage remove error:", e);
    }
  }
};



