const { User } = require('../models')

class Controller {
    static async showUsers (req, res, next){
        try {
            let calledUsers = await User.findAll()
            calledUsers.map(el => {
                delete el.password
                return el
            })

            res.status(200).json(calledUsers)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async getUser (req, res, next){
        try {
            let { id } = req.params

            let calledUser = await User.findByPk(id)
            if (!calledUser) throw({name: "UnknownId"})

            delete calledUser.password
            res.status(200).json(calledUser)
        } catch (error) {
            next(error)
        }
    }

    static async postUser (req, res, next){
        try {
            let { username, email, password, role, phoneNumber, address } = req.body
            if (!role) role = 'Admin'

            let newUser = await User.create({username, email, password, role, phoneNumber, address})
            res.status(200).json({msg: `User with id: ${newUser._id} has been created`})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser (req, res, next){
        try {
            let { id } = req.params

            let deletedUser = await User.destroy(id)
            if (!deletedUser) throw({name: "UnknownId"})

            res.status(200).json({msg: `User with id: ${deletedUser._id} has been deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller