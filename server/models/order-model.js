export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Order = sequelize.define(
    "orders",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      is_paid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      paid_at: {
        type: DataTypes.DATE,
      },

      is_delivered: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      delivered_at: {
        type: DataTypes.DATE,
      },

      payment_method: {
        type: DataTypes.STRING(50),
      },

      status: {
        type: DataTypes.STRING(50),
      },
    },

    {
      timestamps: true,
    }
  );

  return Order;
};
