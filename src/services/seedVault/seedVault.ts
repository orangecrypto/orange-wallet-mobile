import { SeedVault } from "@orangecryptohq/orangeseed";
import { ReactNativeStorageAdapter } from "./ReactNativeStorageAdapter";
import { MobileCryptoAdapter } from "./MobileCryptoAdapter";

class SeedVaultService {
  private seedVault: SeedVault | null = null;

  async initialize(): Promise<void> {
    if (!this.seedVault) {
      this.seedVault = new SeedVault({
        secureStorageAdapter: ReactNativeStorageAdapter,
        cryptoUtilsAdapter: MobileCryptoAdapter,
        commonStorageAdapter: ReactNativeStorageAdapter,
      });
      console.log("SeedVault initialized!");
    }
  }

  getInstance(): SeedVault {
    if (!this.seedVault) {
      throw new Error("SeedVault is not initialized yet! Call initialize() first.");
    }
    return this.seedVault;
  }
}

export default new SeedVaultService();
