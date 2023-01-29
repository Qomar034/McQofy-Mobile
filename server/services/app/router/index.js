const router = require('express').Router()
const publicRouter = require('./public')
const itemRouter = require('./items')
const promoRouter = require('./promos')
const categoryRouter = require('./categories')

router.use(publicRouter)
router.use(itemRouter)
router.use(promoRouter)
router.use(categoryRouter)

module.exports = router