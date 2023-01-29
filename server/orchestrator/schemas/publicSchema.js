const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});

const publicUrl = 'http://localhost:4002/public/'
const userUrl = 'http://localhost:4001/users/'

const typeDefs = `#graphql
    type Promo {
        id: ID
		name: String
		caption: String
		image: String
		description: String
		expired: String
    }

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
        id: ID
        name: String
    }

    type Query {
        showHighlights: [Promo]
        showPromos: [Promo]
        showItems: [Item]
        showCategories: [Category]
        getPromo(id: ID): Promo
        getItem(slug: String): Item
        getCategory(id: ID): Category
    }
`

const resolvers = {
    Query: {
        showHighlights : async () => {
            try {
                await redis.del('highlights')
                
                let highlights;
                highlights = await redis.get('highlights')

                if (!highlights){
                    
                    let { data } = await axios.get(publicUrl + 'highlights')
                    await redis.set('highlights', JSON.stringify(data))
                    highlights = data
                    
                } else highlights = JSON.parse(highlights, null, 2)

                console.log(highlights);
                return highlights
            } catch (error) {
                console.log(error);
            }
        },
        showPromos : async () => {
            try {
                let promos;
                promos = await redis.get('promos')

                if (!promos){

                    let { data } = await axios.get(publicUrl + 'promos')
                    await redis.set('promos', JSON.stringify(data))
                    promos = data

                } else promos = JSON.parse(promos, null, 2)

                return promos
            } catch (error) {
                console.log(error);
            }
        },        
        showItems : async () => {
            try {
                let items;
                items = await redis.get('items')

                if (!items){

                    let { data } = await axios.get(publicUrl + 'items')
                    await redis.set('items', JSON.stringify(data))
                    items = data

                } else items = JSON.parse(items, null, 2)

                return items
            } catch (error) {
                console.log(error);
            }
        },
        showCategories : async () => {
            try {
                let categories;
                categories = await redis.get('categories')

                if (!categories){
                    
                    let { data } = await axios.get(publicUrl + 'categories')
                    await redis.set('categories', JSON.stringify(data))
                    categories = data

                } else categories = JSON.parse(categories, null, 2)

                return categories
            } catch (error) {
                console.log(error);
            }
        },

        getPromo : async (_, args) => {
            try {
                let { id } = args
                let { data } = await axios.get(publicUrl + 'promos/' + id)

                return data
            } catch (error) {
                console.log(error);
            }
        },
        getItem : async (_, args) => {
            try {
                let { slug } = args
                let { data: item } = await axios.get(publicUrl + 'items/' +slug)
                let { data: User } = await axios.get(userUrl + item.authorId)

                return { ...item, User }
            } catch (error) {
                console.log(error);
            }
        },        
        getCategory : async (_, args) => {
            try {
                let { id } = args
                let { data } = await axios.get(publicUrl + 'categories/' + id)

                return data
            } catch (error) {
                console.log(error);
            }
        }

    },
}

module.exports = { typeDefs, resolvers }