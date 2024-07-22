const multer = require('multer')
const uploadFile = require('../utils/handleFileUpload')
const handleErrorResponse = require('../utils/handleError')

const fileManagement = async (req, res, next) => {
  uploadFile.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err)
      handleErrorResponse(res, `Error processing the file`, 400)
      return
    } else if (err) {
      console.log(error)
      handleErrorResponse(res)
      return
    }
    next()
  })
}

module.exports = fileManagement