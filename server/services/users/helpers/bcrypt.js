const bcrypt = require('bcrypt')

class Password {
    static hashPass(pass){
        return bcrypt.hashSync(pass, 8)
    }
    static comparePass(pass, hashedPass){
        return bcrypt.compareSync(pass, hashedPass)
    }
}

module.exports = Password