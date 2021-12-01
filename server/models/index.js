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

// importing models
import User from "./user-model.js";
db.user = User(sequelize, Sequelize);

// sequelize.sync({ force: true });

// authenticating database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default db;
