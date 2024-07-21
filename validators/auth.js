const { check } = require('express-validator')
const validateResult = require('../utils/handleValidator')

const validateRegisterData = [
  check('name')
    .exists()
    .notEmpty(),
  check('age')
    .exists()
    .notEmpty()
    .isInt({ min: 16 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8, max:50 }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateLoginData = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateUpdateUserData = [
  check('name')
    .optional()
    .notEmpty(),
  check('age')
    .optional()
    .notEmpty()
    .isInt({ min: 16 }),
  check('email')
    .optional()
    .notEmpty()
    .isEmail(),
  check('password')
    .optional()
    .notEmpty()
    .isLength({ min: 8, max:50 }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  validateRegisterData,
  validateLoginData,
  validateUpdateUserData
}