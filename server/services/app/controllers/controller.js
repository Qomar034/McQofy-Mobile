const { Category, Ingredient, Item, Promo, sequelize } = require('../models')

class Controller {
    //Public
    static async pubHighlights (req, res, next){
        try {
            let calledHighlights = await Promo.findAll({limit: 3, order: [["id", "DESC"]]})

            res.status(200).json(calledHighlights)
        } catch (error) {
            next(error)
        }
    }
    static async showPromos (req, res, next){
        try {
            let calledPromos = await Promo.findAll()
            res.status(200).json(calledPromos)
        } catch (error) {
            next(error)
        }
    }
    static async showItems (req, res, next){
        try {
            let calledItems = await Item.findAll({include: [Category, Ingredient], order: [["id", "ASC"]]})
            res.status(200).json(calledItems)
        } catch (error) {
            next(error)
        }
    }
    static async showCategories (req, res, next){
        try {
            let calledCategories = await Category.findAll({order: [["id", "ASC"]]})
            res.status(200).json(calledCategories)
        } catch (error) {
            next(error)
        }
    }
    static async getPromo (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let calledPromo = await Promo.findByPk(id)
            if (!calledPromo) throw({name: "InvalidId"})

            res.status(200).json(calledPromo)
        } catch (error) {
            next(error)
        }
    }
    static async getItem (req, res, next){
        try {
            let { slug } = req.params
            if (!slug) throw({name: "UnknownSlug"})

            let calledItem = await Item.findOne({where: {slug}, include: [ Category, Ingredient] })
            if (!calledItem) calledItem = await Item.findOne({where: {id: slug}, include: [ Category, Ingredient] })
            if (!calledItem) throw({name: "InvalidId"})

            res.status(200).json(calledItem)
        } catch (error) {
            next(error)
        }
    }
    static async getCategory (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let calledCategory = await Category.findByPk(id)
            if (!calledCategory) throw({name: "InvalidId"})

            res.status(200).json(calledCategory)
        } catch (error) {
            next(error)
        }
    }

    //CRUD Items
    static async postItem (req, res, next){
        try {
            let { name, price, imgUrl, description, authorId, categoryId, ingredients } = req.body
            if (!authorId) authorId = req.user.id

            // Using Managed Transaction
            const result = await sequelize.transaction(async (t) => {
                if (!ingredients?.length) throw({name: "UnknownIngredients"})

                let newItem = await Item.create({ name, price, imgUrl, description, authorId, categoryId }, { transaction: t })

                let dataIngredient = [];
                ingredients.forEach((el) => {
                  if (el) dataIngredient.push({ name: el, itemId: newItem.id });
                });

                await Ingredient.bulkCreate(dataIngredient, { transaction: t })

                let calledItem = await Item.findOne({ 
                    where: {id: newItem.id}, 
                    include: [ Category, Ingredient, { model: User, attributes: ["username", "email"]} ],
                    transaction: t
                })
                return calledItem
            })

            res.status(201).json({msg: `new Item with id ${result.id} has been created`})
        } catch (error) {
            next(error)
        }
    }
    static async putItem (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let { name, price, imgUrl, description, categoryId, ingredients } = req.body

            // Using Managed Transaction
            const result = await sequelize.transaction(async (t) => {
                if (!ingredients?.length) throw({name: "UnknownIngredients"})
                
                let calledItem = await Item.findOne({where: { id }, include: [ Ingredient ], transaction: t })
                if (!calledItem) throw({name: "InvalidId"})

                await calledItem.update({ name, price, imgUrl, description, categoryId }, { transaction: t})
                if (ingredients.length !== calledItem.Ingredients.length) throw({name: "UnknownIngredients"})

                let dataIngredient = [];
                ingredients.forEach((el, i) => {
                  if (el) dataIngredient.push({ id: calledItem.Ingredients[i].id, name: el, itemId: calledItem.id });
                });

                await Ingredient.bulkCreate(dataIngredient, { updateOnDuplicate: ["name"], transaction: t})
                let updatedItem = await Item.findOne({ 
                    where: {id: calledItem.id}, 
                    include: [ Category, Ingredient, { model: User, attributes: ["username", "email"]} ],
                    transaction: t
                })

                return updatedItem
            })

            res.status(200).json({msg: `Item with id ${result.id} has been updated`})
        } catch (error) {
            next(error)
        }
    }
    static async deleteItem (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let calledItem = await Item.findByPk(id)
            if (!calledItem) throw({name: "InvalidId"})

            await calledItem.destroy()
            res.status(200).json({msg: `${calledItem.name} has been removed from Item`})
        } catch (error) {
            next(error)
        }
    }
    static async callItem (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "Unknownid"})

            let calledItem = await Item.findOne({where: {id}, include: [ Category, Ingredient] })
            if (!calledItem) throw({name: "InvalidId"})

            res.status(200).json(calledItem)
        } catch (error) {
            next(error)
        }
    }

    //CUD Promos
    static async postPromo (req, res, next){
        try {
            let { name, caption, image, description, expired } = req.body
            if (!(expired instanceof Date)) expired = new Date(expired) 

            let newPromo = await Promo.create({ name, caption, image, description, expired })
            res.status(201).json({msg: `new Promo with id ${newPromo.id} has been created`})
        } catch (error) {
            next(error)
        }
    }
    static async putPromo (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let { name, caption, image, description, expired } = req.body
            if (!(expired instanceof Date)) expired = new Date(expired) 

            let calledPromo = await Promo.findByPk(id)
            if (!calledPromo) throw({name: "InvalidId"})

            await calledPromo.update({ name, caption, image, description, expired })
            res.status(200).json({msg: `Promo with Id ${calledPromo.id} has been updated`})
        } catch (error) {
            next(error)
        }
    }
    static async deletePromo (req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let calledPromo = await Promo.findByPk(id)
            if (!calledPromo) throw({name: "InvalidId"})

            await calledPromo.destroy()
            res.status(200).json({msg: `${calledPromo.name} has been removed from Promo`})
        } catch (error) {
            next(error)
        }
    }

    //CUD Categories
    static async postCategory(req, res, next){
        try {
            let { name } = req.body
            await Category.create({ name })

            res.status(201).json({msg: `${name} has been added to Category`})
        } catch (error) {
            next(error)
        }
    }
    static async putCategory(req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let { name } = req.body
            if (!name) throw({name: "UnknownProperty"})

            let calledCategory = await Category.findByPk(id)
            if (!calledCategory) throw({name: "InvalidId"})

            const oldName = calledCategory.name
            await calledCategory.update({ name })
            res.status(200).json({msg: `Category ${oldName} has been updated to ${name}`})
        } catch (error) {
            next(error)
        }
    }
    static async deleteCategory(req, res, next){
        try {
            let { id } = req.params
            if (!id) throw({name: "UnknownId"})

            let calledCategory = await Category.findByPk(id)
            if (!calledCategory) throw({name: "InvalidId"})

            await calledCategory.destroy()
            res.status(200).json({msg: `${calledCategory.name} has been removed from Category`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller