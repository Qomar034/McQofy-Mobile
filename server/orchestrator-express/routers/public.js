const publicRouter = require('express').Router()
const PublicController = require('../controllers/publicController')

publicRouter.get('/public/highlights', PublicController.pubHighlights)
publicRouter.get('/public/promos', PublicController.showPromos)
publicRouter.get('/public/items', PublicController.showItems)
publicRouter.get('/public/categories', PublicController.showCategories)

publicRouter.get('/public/promos/:id', PublicController.getPromo)
publicRouter.get('/public/items/:slug', PublicController.getItem)
publicRouter.get('/public/categories/:id', PublicController.getCategory)

module.exports = publicRouter