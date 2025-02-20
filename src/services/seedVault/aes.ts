/**
 * AEC GCM utils for React Native (TypeScript).
 * @module encryption/aes
 */

import { str2buf, buf2hex, concatBuffers } from '@orangecryptohq/orangeseed'
 import { randomBytes } from 'react-native-randombytes';
import {  subtle } from 'react-native-crypto';
import { Buffer } from 'react-native-buffer';
import 'react-native-get-random-values';

export const IV_SIZE = 16;

/**
 * Generate a random key with a given byte length.
 * @param {number} bytesCount
 * @returns {string}
 */
export function generateRandomKey(bytesCount: number): string {
  return buf2hex(randomBytes(bytesCount))
 
}

/**
 * @param   {string} plaintext - Plaintext to be encrypted.
 * @param   {string} passwordHash - Password to use to encrypt plaintext.
 * @returns {Promise<string>} Encrypted cipherText.
 */
export async function aesGcmEncrypt(plaintext: string, passwordHash: string): Promise<string> {
  const iv =  randomBytes(IV_SIZE);
 

  const data = Buffer.from(plaintext, 'utf-8');
  const alg: AesGcmParams = { name: 'AES-GCM', iv }; // Type the alg variable
  const key = await subtle.importKey('raw', str2buf(passwordHash), alg, false, ['encrypt', 'decrypt']);
  const encrypted = await subtle.encrypt(alg, key, data);
  const buffer = new Uint8Array(encrypted);
  const cipherIv = concatBuffers(iv, buffer);
  return buf2hex(cipherIv);
}

/**
 * @param   {string} cipherText - CipherText to be decrypted.
 * @param   {string} passwordHash - Password to use to decrypt cipherText.
 * @returns {Promise<string>} Decrypted plaintext.
 */
export async function aesGcmDecrypt(cipherText: string, passwordHash: string): Promise<string> {
  const cipher = Buffer.from(cipherText, 'hex');
  const data = cipher.subarray(IV_SIZE);
  const iv = cipher.subarray(0, IV_SIZE);
  const alg: AesGcmParams = { name: 'AES-GCM', iv }; // Type the alg variable
  const key = await subtle.importKey('raw', str2buf(passwordHash), alg, false, ['encrypt', 'decrypt']);
  const plainBuffer = await subtle.decrypt(alg, key, data);
  const plaintext = new TextDecoder().decode(plainBuffer);
  return plaintext;
}


// Type the AesGcmParams interface.  This is important for TypeScript.
interface AesGcmParams {
  name: string;
  iv: Uint8Array;
  additionalData?: Uint8Array; // Optional
  tagLength?: number;       // Optional
}
