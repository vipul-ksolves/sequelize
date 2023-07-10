const express = require('express')
const userRoute = express.Router()
const { signUpUser, signInUser } = require('../controllers/userController')

// user routes
userRoute.post('/sign-up', signUpUser)
userRoute.post('/sign-in', signInUser)

module.exports = userRoute