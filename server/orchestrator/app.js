const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const User = require('./schemas/userSchema')
const Item = require('./schemas/itemSchema')
const Public = require('./schemas/publicSchema')

const server = new ApolloServer({
    typeDefs: [User.typeDefs, Item.typeDefs, Public.typeDefs, ], 
    resolvers: [User.resolvers, Item.resolvers, Public.resolvers, ]
})

startStandaloneServer(server, { listen: { port: 4000 }} )
.then(({ url }) => console.log(`Server orbiting at ${url}`) )
.catch(console.log)