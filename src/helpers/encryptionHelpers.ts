import CryptoJS from 'crypto-js';


export const generateEncryptionKey = (passphrase) => {
  var key128Bits = CryptoJS.PBKDF2(passphrase, process.env.KEYSALT, {
    keySize: 128 / 32,
  });

  return key128Bits.toString();
};

export const encryptPasswords = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decryptPasswords = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalData);
};


export default () => {};
