export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const User = sequelize.define(
    "user",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      contact_number: {
        type: DataTypes.STRING,
        // allowNull: false,
      },

      googleId: {
        type: DataTypes.STRING,
      },

      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
