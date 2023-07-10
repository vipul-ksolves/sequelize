const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db')

// models
const User = require('./User')
const Employee = require('./Employee')
const Session = require('./Session')


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = User(sequelize, DataTypes)
db.employee = Employee(sequelize, DataTypes)
db.session = Session(sequelize, DataTypes)

db.sequelize.sync({force: false})

module.exports = db

