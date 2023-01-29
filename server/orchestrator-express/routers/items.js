const itemRouter = require('express').Router()
const ItemController = require('../controllers/itemController')

itemRouter.post('/items', ItemController.postItem)
itemRouter.get('/items', ItemController.showItems)
itemRouter.get('/items/:id', ItemController.callItem)
itemRouter.put('/items/:id', ItemController.putItem)
itemRouter.delete('/items/:id', ItemController.deleteItem)

module.exports = itemRouter