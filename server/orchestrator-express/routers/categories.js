const categoryRouter = require('express').Router()
const CategoryController = require('../controllers/categoryController')

categoryRouter.post('/categories', CategoryController.postCategory)
categoryRouter.get('/categories', CategoryController.showCategories)
categoryRouter.get('/categories/:id', CategoryController.getCategory)
categoryRouter.put('/categories/:id', CategoryController.putCategory)
categoryRouter.delete('/categories/:id', CategoryController.deleteCategory)

module.exports = categoryRouter