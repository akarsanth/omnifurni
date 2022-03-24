export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const ShippingAddress = sequelize.define(
    "shipping_address",
    {
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      shipping_address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      postal_code: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },

      street: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      province: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },

    {
      freezeTableName: true,
    }
  );

  return ShippingAddress;
};
