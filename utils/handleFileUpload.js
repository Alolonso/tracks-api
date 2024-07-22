const multer = require('multer')

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../storage`)
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const filename = `file-${Date.now()}.${ext}`
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split('.').pop()
  if (imageExtensions.includes(ext)) {
    cb(null, true)
  } else {
    req.uploadError = 'Invalid file'
    cb(null, false)
  }
}

const uploadFile = multer({ 
  storage,
  fileFilter
})

module.exports = uploadFile