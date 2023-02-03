'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Contact, { foreignKey: 'user_id' })
    }
  }
  User.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    underscored: true,
    paranoid: true,
  });
  return User;
};