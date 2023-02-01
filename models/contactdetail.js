'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactDetail.belongsTo(models.Contact, { foreignKey: 'account_id' })
    }
  }
  ContactDetail.init({
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ContactDetail',
    tableName: 'contact_details',
    underscored: true,
    paranoid: true,
  });
  return ContactDetail;
};