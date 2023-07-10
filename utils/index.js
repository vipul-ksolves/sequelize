const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('authorization')

        // verify the token
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token Not Provided!",
            })
        }

        jwt.verify(authHeader, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Token!",
                })
            }
            req.body.userData = decoded
            next()
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    verifyToken
}
