import dbConfig from "../config/dbConfig.js";

// importing Sequelize
import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

// creating new instance of sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// empty db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
