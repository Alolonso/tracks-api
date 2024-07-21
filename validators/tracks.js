const { check } = require('express-validator')
const validateResult = require('../utils/handleValidator')

const validateTrackData = [
  check('title').exists().notEmpty(),
  check('album').optional().notEmpty(),
  check('artist').exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateTrackData }