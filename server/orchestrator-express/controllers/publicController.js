const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});

const baseUrl = 'http://localhost:4002/public/'
const baseUrlUser = 'http://localhost:4001/users/'

class PublicController {
    static async pubHighlights(req, res, next) {
        try {
            let { data } = await axios.get(baseUrl + 'highlights')

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async showPromos(req, res, next) {
        try {
            let promos;
            promos = await redis.get('promos')

            if (!promos){
                let { data } = await axios.get(baseUrl + 'promos')
                await redis.set('promos', JSON.stringify(data))
                promos = data
            } else promos = JSON.parse(promos, null, 2)

            res.status(200).json(promos)
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

    static async showCategories(req, res, next) {
        try {
            let categories;
            categories = await redis.get('categories')

            if (!categories){
                let { data } = await axios.get(baseUrl + 'categories')
                await redis.set('categories', JSON.stringify(data))
                categories = data
            } else categories = JSON.parse(categories, null, 2)

            res.status(200).json(categories)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async getPromo(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.get(baseUrl + 'promos/' + id)

            res.status(200).json(data)
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

    static async getCategory(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.get(baseUrl + 'categories/' + id)

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = PublicController