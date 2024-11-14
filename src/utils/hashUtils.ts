import CryptoJS from 'crypto-js';

export const createHash = (data, botToken) => {
  const authData = Object.keys(data).reduce((acc, key) => {
    if (key !== 'hash') {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  // Compute the hash
  const secretKey = CryptoJS.SHA256(botToken);
  const dataCheckString = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');

  console.warn(`Data check string with bot token ${botToken}: \n${dataCheckString}`);
  return CryptoJS.HmacSHA256(dataCheckString, secretKey).toString(CryptoJS.enc.Hex);
};