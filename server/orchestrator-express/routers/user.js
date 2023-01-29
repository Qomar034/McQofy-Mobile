const userRouter = require('express').Router()
const UserController = require('../controllers/userController')

userRouter.get("/users", UserController.showUsers)
userRouter.post("/users", UserController.postUser)
userRouter.get("/users/:id", UserController.getUser)
userRouter.delete("/users/:id", UserController.deleteUser)

module.exports = userRouter