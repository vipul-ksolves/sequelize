const db = require('../models')
const Employee = db.employee

const createEnployee = async (req, res) => {
    try {
        const { age, department, userData } = req.body
        const existingEmployee = await Employee.findOne({ where: { department } })

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee Already Exit",
            })
        }

        if (age && department) {
            const newEmployee = await Employee.create({ name: userData.dataValues.name, age, department })
            return res.status(200).json({
                newEmployee,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "No data provided",
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll()
        return res.status(200).json({ employees })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({ employee })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const updateEnployee = async (req, res) => {
    try {
        const updatedData = req.body

        if (updatedData) {
            const updatedEmployee = await Employee.update(updatedData, {
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({ status: true, data: updatedEmployee, message: "Employee details updated" })
        } else {
            return res.status(400).json({
                success: false,
                message: "No data provided",
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        await Employee.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({ status: true, message: "Employee deleted" })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createEnployee,
    getEmployees,
    getEmployee,
    updateEnployee,
    deleteEmployee
}