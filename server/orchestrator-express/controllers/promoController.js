const axios = require('axios')
const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-13837.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13837,
    password: 'LWgFLiGdDbrJPBPRaSyvLCPQHsnYXHcc'
});
const baseUrl = 'http://localhost:4002/promos/'

class PromoController {
    static async postPromo (req, res, next){
        try {
            let { name, caption, image, description, expired } = req.body

            let { data } = await axios.post(baseUrl, { name, caption, image, description, expired })
            await redis.del('promos')

            res.status(201).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async putPromo (req, res, next){
        try {
            let { id } = req.params
            let { name, caption, image, description, expired } = req.body

            let { data } = await axios.put(baseUrl + id, { name, caption, image, description, expired })
            await redis.del('promos')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    static async deletePromo (req, res, next){
        try {
            let { id } = req.params

            let { data } = await axios.delete(baseUrl + id)
            await redis.del('promos')

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async getPromo(req, res, next) {
        try {
            let { id } = req.params
            let { data } = await axios.get(baseUrl + id)

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
                let { data } = await axios.get(baseUrl)
                await redis.set('promos', JSON.stringify(data))
                promos = data
            } else promos = JSON.parse(promos, null, 2)

            res.status(200).json(promos)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = PromoController