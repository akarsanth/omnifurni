export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const DefaultAddress = sequelize.define(
    "default_address",
    {
      address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      postal_code: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },

      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      freezeTableName: true,
    }
  );

  return DefaultAddress;
};
