const router = require('express').Router()
const Controller = require('../controllers')

router.get("/users", Controller.showUsers)
router.post("/users", Controller.postUser)
router.get("/users/:id", Controller.getUser)
router.delete("/users/:id", Controller.deleteUser)

module.exports = router