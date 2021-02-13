const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        isActive: DataTypes.INTEGER,
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 12);
          },
        },
      }
    );
  }
}

User.validatePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;
