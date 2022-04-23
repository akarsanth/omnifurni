export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const OrderLine = sequelize.define(
    "order_line",
    {
      orderline_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // order_id and product_id => composite key
      order_id: {
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

      line_total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },

    {
      timestamps: true,
    }
  );

  return OrderLine;
};
