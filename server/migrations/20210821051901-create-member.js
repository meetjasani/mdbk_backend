'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('member', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      coin_balance: {
        type: Sequelize.DECIMAL
      },
      login_type: {
        type: Sequelize.ENUM(['google', 'facebook', 'naver', 'kakaotalk', 'apple', 'website']),
        defaultValue: 'website'
      },
      status: {
        type: Sequelize.ENUM(['enable', 'disable', 'deleted']),
        defaultValue: 'enable'
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('member');
  }
};