'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Ingredient, {foreignKey: "itemId"})
      Item.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Item.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Item Name must be filled" },
        notEmpty: { msg: "Item Name cannot be empty" }
      }
    },
    slug: DataTypes.STRING,
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Item Description must be filled" },
        notEmpty: { msg: "Item Description cannot be empty" }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: { msg: "Item Price must be filled" },
        notEmpty: { msg: "Item Price cannot be empty" },
        min: {
          args: 4500,
          msg: "Item Price must be above Rp. 4500"
        }
      }
    },
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Item Image must be filled" },
        notEmpty: { msg: "Item Image cannot be empty" }
      }
    },
    authorId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });

  Item.beforeCreate((instance, options) => {
    return instance.slug = (instance.name).toLocaleLowerCase().replace(/ /g, '-')
  })

  Item.afterUpdate((instance, options) => {
    return instance.slug = (instance.name).toLocaleLowerCase().replace(/ /g, '-')
  })
  return Item;
};