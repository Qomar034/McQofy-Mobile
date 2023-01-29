const axios = require('axios')
const baseUrl = 'http://localhost:4001/users/'

class UserController {
    static async showUsers(req, res, next) {
        try {
            let { data } = await axios.get(baseUrl)
            let calledUsers = data.map(el => {
                delete el.password
                return el
            })

            res.status(200).json(calledUsers)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.get(baseUrl + id)

            if (data.password) delete calledUser.password
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async postUser(req, res, next) {
        try {
            let { username, email, password, role, phoneNumber, address } = req.body
            if (!role) role = 'Admin'

            let { data } = await axios.post(baseUrl, { username, email, password, role, phoneNumber, address })
            res.status(200).json({ msg: data.msg })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.delete(baseUrl + id)

            res.status(200).json({ msg: data.msg })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = UserController