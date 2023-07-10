const express = require('express')
const cors = require('cors')

const router = require('./routes')

// conect data base
require('./models')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// default routes
app.get('/', function (req, res) {
    res.send('Hello Root')
})
app.use('/', router)

// server
app.listen(process.env.APP_PORT, () => {
    console.log(`App is listtening in port ${process.env.APP_PORT}`)
});
