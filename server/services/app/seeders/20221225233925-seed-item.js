"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataItem = require("../data.json").Items.map((el) => {
      delete el.id;
      delete el.authorId
      el.authorId = "63a8d85506b279b0f5b46363"
      el.slug = (el.name).toLocaleLowerCase().replace(/ /g, '-')
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Items", dataItem);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};