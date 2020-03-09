/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

dotenv.config();

module.exports.development = {
  dialect: 'postgres',
  seederStorage: 'sequelize',
  url: process.env.DB_URL,
};

module.exports.production = {
  dialect: 'postgres',
  url: process.env.DB_URL,
};

module.exports.test = {
  dialest: 'postgres',
  seederStorage: 'sequelize',
  url: process.env.TEST_DB_URL,
};
