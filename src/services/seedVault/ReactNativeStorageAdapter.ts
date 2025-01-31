import { StorageAdapter } from "@orangecryptohq/orangeseed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ReactNativeStorageAdapter: StorageAdapter = {
    get: async (key: string): Promise<string | null> => {
        return await AsyncStorage.getItem(key);
    },
    set: async (key: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(key, value);
    },
    remove: async (key: string): Promise<void> => {
        await AsyncStorage.removeItem(key);
    }
};


