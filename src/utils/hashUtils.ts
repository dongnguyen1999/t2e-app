import CryptoJS from 'crypto-js';

export const createHash = (data: { [key: string]: unknown }, botToken: string) => {
  const authData = Object.keys(data).reduce((acc, key) => {
    if (key !== 'hash') {
      acc[key] = data[key];
    }
    return acc;
  }, {} as { [key: string]: unknown });

  // Compute the hash
  const secretKey = CryptoJS.SHA256(botToken);
  const dataCheckString = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');
  return CryptoJS.HmacSHA256(dataCheckString, secretKey).toString(CryptoJS.enc.Hex);
};