const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const router = require('./routers')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Conducting express-orchestra on port ${port}`)
})