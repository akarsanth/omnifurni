export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  // Junction table For (Cart and Product)
  const CartLine = sequelize.define(
    "cart_line",
    {
      cartline_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // cart_id and product_id => composite key
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      timestamps: true,
    }
  );

  return CartLine;
};
