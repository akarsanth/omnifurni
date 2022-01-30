export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Order = sequelize.define(
    "order",
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
        type: DataTypes.TIME,
      },

      is_delivered: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      delivered_at: {
        type: DataTypes.TIME,
      },

      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      timestamps: true,
    }
  );

  return Order;
};
