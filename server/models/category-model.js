export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },

    {
      timestamps: true,
    }
  );

  return Category;
};
