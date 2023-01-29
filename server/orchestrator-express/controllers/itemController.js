const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});

const baseUrl = 'http://localhost:4002/items/'
const baseUrlUser = 'http://localhost:4001/users/'

class ItemController {
    static async postItem (req, res, next){
        try {
            let { name, price, imgUrl, description, authorId, categoryId, ingredients } = req.body

            let { data } = await axios.post(baseUrl, { name, price, imgUrl, description, authorId, categoryId, ingredients })
            await redis.del('items')

            res.status(201).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async putItem (req, res, next){
        try {
            let { id } = req.params
            let { name, price, imgUrl, description, categoryId, ingredients } = req.body

            let { data } = await axios.put(baseUrl + id, { name, price, imgUrl, description, categoryId, ingredients })
            await redis.del('items')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async deleteItem (req, res, next){
        try {
            let { id } = req.params

            let { data } = await axios.delete(baseUrl + id)
            await redis.del('items')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async callItem (req, res, next){
        try {
            let { id } = req.params

            let { data: item } = await axios.get(baseUrl + id)
            let { data: User } = await axios.get(baseUrlUser + item.authorId)

            res.status(200).json({ ...item, User })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async getItem(req, res, next) {
        try {
            let { slug } = req.params

            let { data: item } = await axios.get(baseUrl + 'items/' + slug)
            let { data: User } = await axios.get(baseUrlUser + item.authorId)

            res.status(200).json({ ...item, User })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async showItems(req, res, next) {
        try {
            let items;
            items = await redis.get('items')

            if (!items){
                let { data } = await axios.get(baseUrl + 'items')
                await redis.set('items', JSON.stringify(data))
                items = data
            } else items = JSON.parse(items, null, 2)
            
            res.status(200).json(items)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = ItemController