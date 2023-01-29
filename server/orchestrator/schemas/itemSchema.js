const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});

const itemUrl = 'http://localhost:4002/items/'
const userUrl = 'http://localhost:4001/users/'

const typeDefs = `#graphql
    type Item {
        id: ID
		name: String
		slug: String
		description: String
		price: Int
		imgUrl: String
		authorId: String
		categoryId: Int
        Category: Category
        User: User
        Ingredients: [Ingredients]
    }

    type User {
        username: String
        email: String
    }

    type Category {
        id: ID
        name: String
    }

    type Ingredients {
        name: String
    }

    input ItemInput {
        name: String,
		description: String,
		price: Int,
		imgUrl: String,
		categoryId: Int,
        ingredients: [IngredientsInput]
    }

    input IngredientsInput {
        name: String
    }

    type Query {
        showItems: [Item]
        callItem (id: Int): Item
    }

    type Mutation {
        addItem(newItem: ItemInput): Item
        editItem(id: Int, dataItem: ItemInput): Item
        deleteItem(id: Int): Item
    }
`

const resolvers = {
    Query: {
        showItems : async () => {
            try {
                let items;
                items = await redis.get('items')

                if (!items){
                    let { data } = await axios.get(itemUrl)
                    await redis.set('items', JSON.stringify(data))
                    items = data
                } else items = JSON.parse(items, null, 2)

                return items
            } catch (error) {
                console.log(error);
            }
        },
        callItem : async (_, args) => {
            try {
                let { id } = args
                let { data: item } = await axios.get(itemUrl + id)
                let { data: User } = await axios.get(userUrl + item.authorId)

                return { ...item, User }
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        addItem : async(_, args) => {
            try {
                let { newItem } = args

                let { data } = await axios.post(itemUrl, { newItem })
                await redis.del('items')

                return data
            } catch (error) {
                console.log(error);
            }
        },
        editItem: async(_, args) => {
            try {
                let { id, dataItem } = args

                let { data } = await axios.put(itemUrl + id, dataItem)
                await redis.del('items')

                return data
            } catch (error) {
                console.log(error);
            }
        },
        deleteItem : async(_, args) => {
            try {
                let { id } = args

                let { data } = await axios.delete(itemUrl + id)
                await redis.del('items')

                return data
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = { typeDefs, resolvers }