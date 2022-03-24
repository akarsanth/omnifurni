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

  return DefaultAddress;
};
