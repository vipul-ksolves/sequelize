
const uploadFile = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "File uploaded successfuly!",
    })
}

module.exports = uploadFile