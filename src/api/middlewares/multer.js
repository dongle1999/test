const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../public/uploads/profile'),
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
})
const uploadUserAvatar = multer({ storage: storage })

module.exports = uploadUserAvatar