// seeders/YYYYMMDDHHMMSS-demo-user.js

const crypto = require("crypto");
const uuid = crypto.randomUUID();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      userId: uuid,
      name: 'John Doe',
      email: 'john.doe67@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
