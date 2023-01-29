const axios = require('axios')
const userUrl = 'http://localhost:4001/users/'

const typeDefs = `#graphql
    type User {
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    input UserInput {
        username: String
        email: String
        password: String
        role: String
        phoneNumber: String
        address: String
    }

    type Query {
        showUsers: [User]
        getUser(id: String): User
    }

    type Mutation {
        addUser(newUser: UserInput): User
        deleteUser(id: String): User
    }
`

const resolvers = {
    Query: {
        showUsers : async () => {
            try {
                let { data } = await axios.get(userUrl)
                return data
            } catch (error) {
                console.log(error);
            }
        },
        getUser : async (_, args) => {
            try {
                let { id } = args
                let { data } = await axios.get(userUrl + id)
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addUser : async(_, args) => {
            try {
                let { newUser } = args
                let { data } = await axios.post(userUrl, { newUser })
                return data
            } catch (error) {
                console.log(error);
            }
        },
        deleteUser : async(_, args) => {
            try {
                let { id } = args
                let { data } = await axios.delete(userUrl + id)
                return data
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = { typeDefs, resolvers }