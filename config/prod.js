require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3010,
  },
  database: {
    url: process.env.DB_URL,
  },
  token: {
    jwtKey: process.env.JWT_Secret,
  },
  api: {
    prefix: '^/api/v[1-9]',
    version: [1],
  },
};
