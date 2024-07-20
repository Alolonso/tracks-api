const express = require('express')
const router = express.Router()

const {
  validateRegisterData,
  validateLoginData
} = require('../validators/auth')

const {
  registerCtrl,
  loginCtrl
} = require('../controllers/auth')

router.post('/register', validateRegisterData, registerCtrl)
router.post('/login', validateLoginData, loginCtrl)

module.exports = router