export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Review = sequelize.define(
    "review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Review;
};
