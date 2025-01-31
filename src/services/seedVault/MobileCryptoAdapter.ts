import AES from 'react-native-aes-crypto';
import { randomBytes } from 'react-native-randombytes';
import { createHash } from 'react-native-crypto';

export const MobileCryptoAdapter = {
    
    // Encrypt data using AES
    encrypt: async (data: string, password: string): Promise<string> => {
        const iv = randomBytes(16).toString('hex'); // Generate a random IV
        const key = await AES.pbkdf2(password, iv, 5000, 256,'sha1'); // Derive key
        const encryptedData = await AES.encrypt(data, key, iv, 'aes-256-cbc'); // Encrypt data
        return `${iv}:${encryptedData}`; // Return IV with encrypted data
    },

    // Decrypt AES encrypted data
    decrypt: async (data: string, password: string): Promise<string> => {
        try {
            const [iv, encryptedData] = data.split(':'); // Extract IV
            const key = await AES.pbkdf2(password, iv, 5000, 256); // Derive key
            return await AES.decrypt(encryptedData, key, iv, 'aes-256-cbc'); // Decrypt data
        } catch (error) {
            throw new Error("Decryption failed: Incorrect password or corrupted data");
        }
    },

    // Hash data using SHA-256
    hash: async (data: string, salt: string): Promise<string> => {
        return createHash('sha256').update(data + salt).digest('hex');
    },

    // Generate secure random bytes
    generateRandomBytes: (length: number): string => {
        return randomBytes(length).toString('hex');
    }
};
