import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import winston from 'winston';
import { models } from '../sequelize/models';


const { DB_URL, TEST_DB_URL, NODE_ENV } = process.env;

const db = NODE_ENV === 'test' ? TEST_DB_URL : DB_URL;

const sequelize = new Sequelize(db!, {
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true,
  },
  logging: false,
  models,
});

const verify = async () => {
  try {
    await sequelize.authenticate();
    winston.info('Connection has been established successfully.');
  } catch (error) {
    winston.error('Unable to connect to the database:', error);
  }
};

verify();


export default sequelize;
