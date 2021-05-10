'use strict';
require('dotenv').config();
module.exports = {
    app: {
        name: "To-Do RESTFul api",
        baseUrl: `http://localhost:`,
        port: process.env.PORT || 3000
    },
    client: {
        url: process.env.CLIENT || 'http://localhost:3000'
    },
    api: {
        prefix: '^/api/v[1-9]',
        version: [1],
    },
    database: {
        url: process.env.DB_URL
    },
    token: {
        jwtKey: process.env.JWT_Secret
    }
};
