const express = require('express')
const fs = require('fs')
const router = express.Router()
const handleErrorResponse = require('../utils/handleError')

const pathRoutes = __dirname

const removeExtension = (fileName) => {
  return fileName.split('.').shift()
}

fs.readdirSync(pathRoutes).filter((file) => {
  const fileWithoutExt = removeExtension(file)
  const skip = ['index'].includes(fileWithoutExt)
  if (!skip) {
    router.use(`/${fileWithoutExt}`, require(`./${fileWithoutExt}`))
  }
})

router.get('*', (req, res) => {
  handleErrorResponse(res, 'Not Found', 404)
})

module.exports = router