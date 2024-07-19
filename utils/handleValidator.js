const { validationResult } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res, 'Invalid data', 403)
  }
}

module.exports = validateResult