const promoRouter = require('express').Router()
const Controller = require('../controllers/controller')

promoRouter.post('/promos', Controller.postPromo)
promoRouter.get('/promos', Controller.showPromos)
promoRouter.get('/promos/:id', Controller.getPromo)
promoRouter.put('/promos/:id', Controller.putPromo)
promoRouter.delete('/promos/:id', Controller.deletePromo)

module.exports = promoRouter