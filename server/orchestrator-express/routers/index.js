const router = require('express').Router()
const userRouter = require('./user')
const publicRouter = require('./public')
const itemRouter = require('./items')
const categoryRouter = require('./categories')
const promoRouter = require('./promos')

router.use(userRouter)
router.use(publicRouter)
router.use(itemRouter)
router.use(categoryRouter)
router.use(promoRouter)

module.exports = router