const multer = require("multer")

// memory storage use karenge (file disk pe save nahi hogi)
const storage = multer.memoryStorage()

// ek multer instance export kar do
const upload = multer({ storage })

module.exports = upload
