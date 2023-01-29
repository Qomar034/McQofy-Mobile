const { getDb } = require('../config/mongo')
const { ObjectId } = require('mongodb')
const Password = require('../helpers/bcrypt')
const defaultTable = "Users"

class User {
    static checkModel(){
        const validation = {
            username: { args: true, msg: "username is required" },
            email: { args: true, msg: "email is required" },
            password: { args: true, msg: "password is required" },
            role: false,
            phoneNumber: false,
            address: false
        }
        return validation
    }

    static collection(table) {
        if (!table) table = defaultTable
        return getDb().collection(table);
    }

    static async findAll(){
        try {
            return await this.collection().find().toArray()
        } catch (error) {
            throw(error)
        }
    }

    static async findByPk(identifier){
        try {
            return await this.collection().findOne({_id: new ObjectId(identifier)})
        } catch (error) {
            throw(error)
        }
    }

    static async create(data){
        try {
            let errors = []
            let validation = this.checkModel()
            
            for (let el in validation) {
                if (validation[el].args == true) {
                    if (!data[el]) errors.push(validation[el].msg)
                }
            }

            if (errors.length) throw({name: "ValidationError", errors});

            data.password = Password.hashPass(data.password)
            const newData = await this.collection().insertOne(data)

            return await this.findByPk(newData.insertedId)
        } catch (error) {
            throw(error)
        }
    }
    
    static async destroy(identifier){
        try {
            const deletedData = await this.findByPk(identifier)
            await this.collection().deleteOne({_id: new ObjectId(identifier)})
            return deletedData
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = User