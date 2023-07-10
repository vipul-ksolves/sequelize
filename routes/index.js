const express = require('express')
const upload = require('../utils/uploadDocument')
const uploadFile = require('../controllers/uploadFileController')

//routes
const userRoute = require('./User')
const employeeRoute = require('./Employee')

const router = express.Router()

router.use('/user', userRoute)
router.use('/', employeeRoute)

// file upload
router.post('/file-upload', upload, uploadFile)

module.exports = router


