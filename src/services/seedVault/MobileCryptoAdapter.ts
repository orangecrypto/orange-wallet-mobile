 import { randomBytes } from 'react-native-randombytes';
 import crypto from 'crypto';
 import { generateKeyArgon2id } from './EncryptionUtils';

export const MobileCryptoAdapter = {

    encrypt: async (data: string, password: string): Promise<string> => {
        try {
            const iv = randomBytes(16);  
            const salt = randomBytes(16).toString('hex');  
            const key = await generateKeyArgon2id(password, salt);

            const keyBuffer = Buffer.from(key, 'hex');
            const aesKey = keyBuffer.length === 32 ? keyBuffer : crypto.createHash('sha256').update(keyBuffer).digest();

            const cipher = crypto.Cipheriv('aes-256-cbc', aesKey, iv);
            let encryptedData = cipher.update(data, 'utf8', 'base64');
            encryptedData += cipher.final('base64'); 

            return `${salt}:${iv.toString('hex')}:${encryptedData}`;
        } catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    },

    decrypt: async (encryptedData: string, password: string): Promise<string> => {
        try {
            const [salt, ivHex, encrypted] = encryptedData.split(':');
            const key = await generateKeyArgon2id(password, salt);

            const keyBuffer = Buffer.from(key, 'hex');
            const aesKey = keyBuffer.length === 32 ? keyBuffer : crypto.createHash('sha256').update(keyBuffer).digest();

            const decipher = crypto.Decipheriv('aes-256-cbc', aesKey, Buffer.from(ivHex, 'hex'));
            let decryptedData = decipher.update(encrypted, 'base64', 'utf8');
            decryptedData += decipher.final('utf8'); 

            return decryptedData;
        } catch (error) {
            throw new Error('Decryption failed: Incorrect password or corrupted data');
        }
    },

    hash: async (data: string, salt: string): Promise<string> => {
        return crypto.createHash('sha256').update(data + salt).digest('hex');
    },

    generateRandomBytes: (length: number): string => {
        return crypto.randomBytes(length).toString('hex');
    }
};
