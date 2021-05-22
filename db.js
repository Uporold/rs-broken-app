import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5433,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
