import { decryptSeedPhrase, encryptSeedPhrase } from '@orangecryptohq/orangeseed/dist/encryption';
import {
  decryptMnemonicWithHandler,
  encryptMnemonicWithHandler,
} from '@orangecryptohq/orangeseed/dist/wallet';
import argon2 from 'react-native-argon2';

/**
 * Generate an Argon2id derived key from a password and salt.
 * @param password - The user's password
 * @param salt - Randomly generated salt
 * @returns A 16-byte hash as the key
 */
export async function generateKeyArgon2id(password: string, salt: string): Promise<string> {
  try {
    const result = await argon2(password, salt, {
      iterations: 3,
      memory: 64 * 1024,
      parallelism: 4,
      hashLength: 16,
      mode: 'argon2id',  // ✅ FIXED: Correct Argon2id mode
    });
    return result.rawHash; // ✅ FIXED: Return the raw hash value
  } catch (error) {
    throw new Error(`Argon2id key generation failed: ${error.message}`);
  }
}

/**
 * Generate an Argon2i derived key from a password and salt.
 * @param password - The user's password
 * @param salt - Randomly generated salt
 * @returns A 48-byte hash as the key
 */
export async function generateKeyArgon2i(password: string, salt: string): Promise<string> {
  try {
    const result = await argon2(password, salt, {
      iterations: 3,
      memory: 64 * 1024,
      parallelism: 4,
      hashLength: 48,
      mode: 'argon2i',  // ✅ FIXED: Correct Argon2i mode
    });
    return result.rawHash; // ✅ FIXED: Return the raw hash value
  } catch (error) {
    throw new Error(`Argon2i key generation failed: ${error.message}`);
  }
}

/**
 * Encrypt a seed phrase using Argon2-derived key and `@orangecryptohq/orangeseed`.
 * @param seed - The mnemonic/seed phrase
 * @param password - The password for encryption
 * @returns The encrypted seed as a string
 */
export async function encryptSeedPhraseHandler(seed: string, password: string): Promise<string> {


  return encryptMnemonicWithHandler({
    seed,
    password,
    mnemonicEncryptionHandler: encryptSeedPhrase,
  });
}

/**
 * Decrypt a seed phrase using Argon2-derived key and `@orangecryptohq/orangeseed`.
 * @param encryptedSeed - The encrypted mnemonic/seed phrase
 * @param password - The password used for encryption
 * @returns The original seed phrase
 */
export async function decryptSeedPhraseHandler(
  encryptedSeed: string,
  password: string,
): Promise<string> {
  try {
    return await decryptMnemonicWithHandler({
      encryptedSeed,
      password,
      mnemonicDecryptionHandler: decryptSeedPhrase,
    });
  } catch (error) {
    throw new Error('Invalid password or corrupted data');
  }
}
