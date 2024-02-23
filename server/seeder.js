import colors from "colors";

import db from "./models/index.js";
const User = db.user;
const Product = db.product;
const Category = db.category;

// importing data
import users from "./data/users.js";
import products from "./data/products.js";
import categories from "./data/categories.js";

import dotenv from "dotenv";
dotenv.config();

const importData = async () => {
  try {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await User.destroy({ where: {} });

    const createdUsers = await User.bulkCreate(users);

    const adminUserID = createdUsers[0].user_id;

    const sampleProducts = products.map((product) => {
      return { ...product, user_id: adminUserID };
    });

    await Category.bulkCreate(categories);
    await Product.bulkCreate(sampleProducts);
  } catch (err) {
    console.log(`${err}`.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
