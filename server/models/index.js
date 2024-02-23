import dbConfig from "../config/dbConfig.js";

// importing Sequelize
import Sequelize from "sequelize";
// const { DataTypes } = Sequelize;

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

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

// empty db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing models functions
import User from "./user-model.js";
import DefaultAddress from "./defaultAddress-model.js";
import Category from "./category-model.js";
import Product from "./product-model.js";
import Review from "./review-model.js";
import Order from "./order-model.js";
import OrderLine from "./orderline-model.js";
import ShippingAddress from "./shippingAddress-model.js";

/////////////////////////////////////////////
// tables
db.user = User(sequelize, Sequelize);
db.defaultAddress = DefaultAddress(sequelize, Sequelize);
db.category = Category(sequelize, Sequelize);
db.product = Product(sequelize, Sequelize);
db.review = Review(sequelize, Sequelize);
db.order = Order(sequelize, Sequelize);
db.orderLine = OrderLine(sequelize, Sequelize);
db.shippingAddress = ShippingAddress(sequelize, Sequelize);

//////////////////////////////////////////////
// Relationship between user and default address
db.defaultAddress.hasOne(db.user, {
  foreignKey: "address_id",
});
db.user.belongsTo(db.defaultAddress, {
  foreignKey: "address_id",
});

// Relationship between product and (user, Category)
// with user
db.user.hasMany(db.product, {
  foreignKey: "user_id",
});
db.product.belongsTo(db.user, {
  foreignKey: "user_id",
});

// with category
db.category.hasMany(db.product, {
  foreignKey: "category_id",
});
db.product.belongsTo(db.category, {
  foreignKey: "category_id",
});

// Relationship between review and (user, product)
// with user
db.user.hasMany(db.review, {
  foreignKey: "user_id",
});
db.review.belongsTo(db.user, {
  foreignKey: "user_id",
});

// with product
db.product.hasMany(db.review, {
  foreignKey: "product_id",
});
db.review.belongsTo(db.product, {
  foreignKey: "product_id",
});

// Relationship between order and user
db.user.hasMany(db.order, {
  foreignKey: "user_id",
});
db.order.belongsTo(db.user, {
  foreignKey: "user_id",
});

// Relationship between Product and Order
// MANY TO MANY RELATIONSHIP
db.product.belongsToMany(db.order, {
  through: db.orderLine,
  foreignKey: "product_id",
});

db.order.belongsToMany(db.product, {
  through: db.orderLine,
  foreignKey: "order_id",
});

// Relationship between order and shipping address
db.shippingAddress.hasOne(db.order, {
  foreignKey: "shipping_address_id",
});

db.order.belongsTo(db.shippingAddress, {
  foreignKey: "shipping_address_id",
});

//////////////////////////////////////////////
// to sync database
// sequelize.sync({ alter: true });

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

/////////////////////////////////
// Resources
// ONE TO MANY:
// https://www.bezkoder.com/sequelize-associate-one-to-many/

// MANY TO MANY
// https://www.bezkoder.com/sequelize-associate-many-to-many/
