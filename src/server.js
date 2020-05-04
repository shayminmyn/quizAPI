const express = require('express')
const app = express()
const db = require('./database')
const cors = require('cors')
const router = require('./router')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(router)

db.getConnect()

app.listen(process.env.PORT, () => {
    console.log("The API is running at "+process.env.PORT)
})
