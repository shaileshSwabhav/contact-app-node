'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Contact.hasMany(models.ContactDetails, { foreignKey: 'account_id' })
      Contact.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Contact.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    underscored: true,
    paranoid: true,
  });
  return Contact;
};