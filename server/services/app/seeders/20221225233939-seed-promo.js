"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataPromo = require("../data.json").Promos.map((el) => {
      delete el.id;
      el.expired = new Date()
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Promos", dataPromo);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Promos", null, {});
  },
};