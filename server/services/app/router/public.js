const publicRouter = require('express').Router()
const Controller = require('../controllers/controller')

publicRouter.get('/public/highlights', Controller.pubHighlights)
publicRouter.get('/public/promos', Controller.showPromos)
publicRouter.get('/public/items', Controller.showItems)
publicRouter.get('/public/categories', Controller.showCategories)

publicRouter.get('/public/promos/:id', Controller.getPromo)
publicRouter.get('/public/items/:slug', Controller.getItem)
publicRouter.get('/public/categories/:id', Controller.getCategory)

module.exports = publicRouter