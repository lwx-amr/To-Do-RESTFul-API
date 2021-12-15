require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3006,
  },
  database: {
    url: 'mongodb://localhost:27017/todo-rest-api-test',
  },
  token: {
    jwtKey: process.env.JWT_Secret,
  },
};
