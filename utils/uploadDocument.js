const multer = require('multer')
const path = require('path')

// TODO: make checks for file size 

//file validation functions
const allowedImageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
]

const isValidImage = (mimetype) => {
    return allowedImageMimeTypes.includes(mimetype)
}

// storage logic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        )
    },
})

const fileFilter = (req, file, cb) => {
    if (isValidImage(file.mimetype)) {
        cb(null, true);
    } else {
       return json({
            success: false,
            message: 'Unsupported Media Type, Upload a valid image file',
        })
    }
}

const maxSize = 1 * 1024 * 1024 // 1MB

const upload = multer({storage: storage, fileFilter: fileFilter, limits: maxSize}).single('avatar')

module.exports = upload

