const promoRouter = require('express').Router()
const PromoController = require('../controllers/promoController')

promoRouter.post('/promos', PromoController.postPromo)
promoRouter.get('/promos', PromoController.showPromos)
promoRouter.get('/promos/:id', PromoController.getPromo)
promoRouter.put('/promos/:id', PromoController.putPromo)
promoRouter.delete('/promos/:id', PromoController.deletePromo)

module.exports = promoRouter