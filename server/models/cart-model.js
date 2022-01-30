export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Cart = sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Cart;
};
