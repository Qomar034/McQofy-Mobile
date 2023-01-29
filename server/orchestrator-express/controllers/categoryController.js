const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});
const baseUrl = 'http://localhost:4002/categories/'

class CategoryController {
    static async postCategory(req, res, next){
        try {
            let { name } = req.body

            let { data } = await axios.post(baseUrl, { name })
            await redis.del('categories')

            res.status(201).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async putCategory(req, res, next){
        try {
            let { id } = req.params
            let { name } = req.body

            let { data } = await axios.put(baseUrl + id, { name })
            await redis.del('categories')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async deleteCategory(req, res, next){
        try {
            let { id } = req.params
            
            let { data } = await axios.delete(baseUrl + id)
            await redis.del('categories')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async getCategory(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.get(baseUrl + id)

            res.status(200).json(data)
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
                let { data } = await axios.get(baseUrl)
                await redis.set('categories', JSON.stringify(data))
                categories = data
            } else categories = JSON.parse(categories, null, 2)

            res.status(200).json(categories)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = CategoryController