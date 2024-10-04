const { promisify } = require('util')
const redis = require("redis")

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

client.on('error', (err) => {
    console.log(err)
})

const getAsync = promisify(client.hget).bind(client)

module.exports = {
    client,
    getAsync
}