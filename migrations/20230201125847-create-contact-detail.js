'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contact_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    }, {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["contact_id"]
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contact_details');
  }
};