export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Product = sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      imagePath: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      countInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      numReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0,
      },

      featured: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },

    {
      timestamps: true,
    }
  );

  return Product;
};
