const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const db = require('../models')
const User = db.user

const signUpUser = async (req, res) => {
    try {
        const { name, email, password, cPassword } = req.body

        if (password !== cPassword) {
            return res.status(400).json({
                success: false,
                message: "Password Not Matched !",
            })
        }

        // encrypt password
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        // check user exist
        const isAvailable = await User.findOne({ where: { email } })
        if (isAvailable) {
            return res.status(400).json({
                success: false,
                message: "User already exist !",
            })
        }

        if (name && email && password) {
            await User.create({ name, email, password: passwordHash })
            return res.status(200).json({
                success: true,
                message: "User Created sucessfuly",
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "data not provided",
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check user exist
        const isAvailable = await User.findOne({ where: { email } })

        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: "User Not registered !",
            })
        }

        // Check password
        const passMatch = bcrypt.compareSync(password, isAvailable.password)

        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect!",
            })
        }

        //generate jwt token
        const token = jwt.sign({ ...isAvailable }, process.env.JWT_TOKEN_SECRET, { expiresIn: 60 * 5 })

        return res.status(400).json({
            success: true,
            message: "User login sucessfuly!",
            token: token
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    signUpUser,
    signInUser,
}