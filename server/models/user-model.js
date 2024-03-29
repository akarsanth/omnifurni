export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};
