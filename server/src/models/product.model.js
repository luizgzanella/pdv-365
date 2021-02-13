const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT,
        isActive: DataTypes.INTEGER,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Product;
