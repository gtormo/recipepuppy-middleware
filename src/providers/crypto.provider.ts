import environment from '../../environment/environment';

// Modules
import { Cipher, Decipher, createCipheriv, randomBytes, createDecipheriv } from 'crypto';

// Types
import { IEncrypt } from '../types/crypto.types';

const algorithm = environment.crypto.algorithm;
const secretKey = environment.crypto.secret;
const iv = randomBytes(16);

const encrypt = (text: string): IEncrypt => {
  const cipher: Cipher = createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash: IEncrypt): string => {
  const decipher: Decipher = createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final()
  ]);

  return decrpyted.toString();
};

export const CryptoProvider = {
  encrypt,
  decrypt
};
