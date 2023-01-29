const itemRouter = require('express').Router()
const Controller = require('../controllers/controller')

itemRouter.post('/items', Controller.postItem)
itemRouter.get('/items', Controller.showItems)
itemRouter.get('/items/:id', Controller.callItem)
itemRouter.put('/items/:id', Controller.putItem)
itemRouter.delete('/items/:id', Controller.deleteItem)

module.exports = itemRouter