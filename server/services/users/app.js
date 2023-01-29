if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const { log } = require('console')
const express = require('express')
const cors = require('cors')

const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 4001

const { mongoConnect } = require('./config/mongo')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

mongoConnect().then(async (db) => {
  log("Successfully Connected to MongoDB");
  
  app.listen(port, () => {
    log(`I'm always here, waiting you on port ${port}`)
  })
})