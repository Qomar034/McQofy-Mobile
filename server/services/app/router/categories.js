const categoryRouter = require('express').Router()
const Controller = require('../controllers/controller')

categoryRouter.post('/categories', Controller.postCategory)
categoryRouter.get('/categories', Controller.showCategories)
categoryRouter.get('/categories/:id', Controller.getCategory)
categoryRouter.put('/categories/:id', Controller.putCategory)
categoryRouter.delete('/categories/:id', Controller.deleteCategory)

module.exports = categoryRouter