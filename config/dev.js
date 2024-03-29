require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3003,
  },
  database: {
    url: 'mongodb://localhost:27017/todo-rest-api',
  },
  token: {
    jwtKey: process.env.JWT_Secret,
  },
};
