// reading environmetal variable file
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
