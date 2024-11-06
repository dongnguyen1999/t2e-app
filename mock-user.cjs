const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { log } = require('console');

const userData = {
  id: 7154169793,
  first_name: 'Dong',
  last_name: 'Nguyen',
  username: 'dongnguyen1299',
  language_code: 'en',
  is_premium: true,
  allows_write_to_pm: true,
  auth_date: Date.now(),
};

const botToken = process.env.TELEGRAM_BOT_TOKEN || '';

const createHash = (data, botToken) => {
  const authData = Object.keys(data).reduce((acc, key) => {
    if (key !== 'hash') {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  // Compute the hash
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const dataCheckString = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');

  log(`Data check string with bot token ${botToken}: \n${dataCheckString}`);
  return crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
};

const userPayload = {
  id: userData.id,
  first_name: userData.first_name,
  last_name: userData.last_name,
  username: userData.username,
  auth_date: userData.auth_date,
};

const hash = createHash(userPayload, botToken);

// Update the userData.ts file
const mockUserPath = path.resolve(__dirname, 'src/mockUser.ts');
const newMockUserContent = `export const mockUser = {
  id: ${userData.id},
  first_name: '${userData.first_name}',
  last_name: '${userData.last_name}',
  username: '${userData.username}',
  language_code: '${userData.language_code}',
  is_premium: ${userData.is_premium},
  allows_write_to_pm: ${userData.allows_write_to_pm},
  auth_date: ${userData.auth_date},
  hash: '${hash}',
};
`;

fs.writeFileSync(mockUserPath, newMockUserContent, 'utf8');