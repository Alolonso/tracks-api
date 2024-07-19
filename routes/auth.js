const express = require('express')
const router = express.Router()

const { validateRegisterData } = require('../validators/auth')

const { registerCtrl } = require('../controllers/auth')

router.post('/register', validateRegisterData, registerCtrl)

module.exports = router