import { sha512 } from '@noble/hashes/sha512';
import { bytesToHex, concatBytes, utf8ToBytes } from '@noble/hashes/utils';
import { getPublicKey, getSharedSecret, Point, signSync, utils } from '@noble/secp256k1';
import { CipherObject, CipherTextEncoding, EncryptContentOptions, getPublicKeyFromPrivate, hashSha256Sync, hmacSha256, SignedCipherObject } from '@stacks/encryption';
import { fromByteArray } from 'base64-js';
import crypto from 'crypto';

export async function encryptContent(
  content: string | Uint8Array,
  options?: EncryptContentOptions
): Promise<string> {
  const opts = Object.assign({}, options);
  let privateKey: string | undefined;
  if (!opts.publicKey) {
    if (!opts.privateKey) {
      throw new Error('Either public key or private key must be supplied for encryption.');
    }
    opts.publicKey = getPublicKeyFromPrivate(opts.privateKey);
  }
  const wasString =
    typeof opts.wasString === 'boolean' ? opts.wasString : typeof content === 'string';
  const contentBytes = typeof content === 'string' ? utf8ToBytes(content) : content;
  const cipherObject = await encryptECIES(
    opts.publicKey,
    contentBytes,
    wasString,
    opts.cipherTextEncoding
  );
  let cipherPayload = JSON.stringify(cipherObject);
  if (opts.sign) {
    if (typeof opts.sign === 'string') {
      privateKey = opts.sign;
    } else if (!privateKey) {
      privateKey = opts.privateKey;
    }
    const signatureObject = signECDSA(privateKey!, cipherPayload);
    const signedCipherObject: SignedCipherObject = {
      signature: signatureObject.signature,
      publicKey: signatureObject.publicKey,
      cipherText: cipherPayload,
    };
    cipherPayload = JSON.stringify(signedCipherObject);
  }
  return cipherPayload;
}

export async function encryptECIES(
  publicKey: string,
  content: Uint8Array,
  wasString: boolean,
  cipherTextEncoding?: CipherTextEncoding,
  deterministicOptions?: {
    ephemeralPrivateKey?: Uint8Array;
    iv?: Uint8Array;
  }
): Promise<CipherObject> {
  const validity = isValidPublicKey(publicKey);
  if (!validity.result) throw validity;

  const ephemeralPrivateKey = deterministicOptions?.ephemeralPrivateKey || utils.randomPrivateKey();
  const ephemeralPublicKey = getPublicKey(ephemeralPrivateKey, true);
  
  let sharedSecret = getSharedSecret(ephemeralPrivateKey, publicKey, true);
  sharedSecret = sharedSecret.slice(1);

  const sharedKeys = sharedSecretToKeys(sharedSecret);
  const initializationVector = deterministicOptions?.iv || utils.randomBytes(16);

  const cipherText = await aes256CbcEncrypt(
    initializationVector,
    sharedKeys.encryptionKey,
    content
  );

  const macData = concatBytes(initializationVector, ephemeralPublicKey, cipherText);
  const mac = hmacSha256(sharedKeys.hmacKey, macData);

  let cipherTextString: string;
  if (!cipherTextEncoding || cipherTextEncoding === 'hex') {
    cipherTextString = bytesToHex(cipherText);
  } else if (cipherTextEncoding === 'base64') {
    cipherTextString = fromByteArray(cipherText);
  } else {
    throw new Error(`Unexpected cipherTextEncoding "${cipherTextEncoding}"`);
  }

  const result: CipherObject = {
    iv: bytesToHex(initializationVector),
    ephemeralPK: bytesToHex(ephemeralPublicKey),
    cipherText: cipherTextString,
    mac: bytesToHex(mac),
    wasString,
  };
  if (cipherTextEncoding && cipherTextEncoding !== 'hex') {
    result.cipherTextEncoding = cipherTextEncoding;
  }
  return result;
}

function sharedSecretToKeys(sharedSecret: Uint8Array): {
  encryptionKey: Uint8Array;
  hmacKey: Uint8Array;
} {
  // generate mac and encryption key from shared secret
  const hashedSecret = hashSha512Sync(sharedSecret);
  return {
    encryptionKey: hashedSecret.slice(0, 32),
    hmacKey: hashedSecret.slice(32),
  };
}

function hashSha512Sync(data: Uint8Array) {
  return sha512(data);
}

function isValidPublicKey(pub: string): {
  result: boolean;
  reason: string | null;
  reason_data: string | null;
} {
  const invalidFormat = {
    result: false,
    reason_data: 'Invalid public key format',
    reason: InvalidPublicKeyReason.InvalidFormat,
  };
  const invalidPoint = {
    result: false,
    reason_data: 'Public key is not a point',
    reason: InvalidPublicKeyReason.IsNotPoint,
  };
  if (pub.length !== 66 && pub.length !== 130) return invalidFormat;
  const firstByte = pub.slice(0, 2);
  // uncompressed public key
  if (pub.length === 130 && firstByte !== '04') return invalidFormat;

  // compressed public key
  if (pub.length === 66 && firstByte !== '02' && firstByte !== '03') return invalidFormat;
  if (!allHexChars(pub)) return invalidFormat;
  try {
    // Converts public key to Point
    const point = Point.fromHex(pub);
    point.assertValidity();

    // Validation passed
    return {
      result: true,
      reason_data: null,
      reason: null,
    };
  } catch (e) {
    return invalidPoint;
  }
}

export enum InvalidPublicKeyReason {
  InvalidFormat = 'InvalidFormat',
  IsNotPoint = 'IsNotPoint',
}

function allHexChars(maybe: string): boolean {
  return maybe.match(/^[0-9a-f]+$/i) !== null;
}

export async function aes256CbcEncrypt(
  iv: Uint8Array,
  key: Uint8Array,
  plaintext: Uint8Array
): Promise<Uint8Array> {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext),
    cipher.final()
  ]);
  return new Uint8Array(encrypted);
}

export function signECDSA(
  privateKey: string,
  content: string | Uint8Array
): {
  publicKey: string;
  signature: string;
} {
  const contentBytes = typeof content === 'string' ? utf8ToBytes(content) : content;
  const publicKey = getPublicKeyFromPrivate(privateKey);
  const contentHash = hashSha256Sync(contentBytes);
  const signature = signSync(contentHash, privateKey);

  return {
    signature: bytesToHex(signature),
    publicKey,
  };
}