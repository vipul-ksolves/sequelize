const express = require('express')
const employeeRoute = express.Router()

const {verifyToken} = require('../utils/index')

//controllers
const {
    createEnployee,
    getEmployees,
    getEmployee,
    updateEnployee,
    deleteEmployee
} = require('../controllers/employeeController')


// employee route
employeeRoute.post('/employees', verifyToken, createEnployee)
employeeRoute.get('/employees', verifyToken, getEmployees)
employeeRoute.get('/employees/:id', verifyToken, getEmployee)
employeeRoute.patch('/employees/:id', verifyToken, updateEnployee)
employeeRoute.delete('/employees/:id', verifyToken, deleteEmployee)

module.exports = employeeRoute