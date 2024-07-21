const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth')
const { userExist } = require('../middlewares/exists')
const { checkUserPermission } = require('../middlewares/permissions')

const {
  validateRegisterData,
  validateLoginData,
  validateUpdateUserData
} = require('../validators/auth')

const {
  registerCtrl,
  loginCtrl,
  updateUserCtrl
} = require('../controllers/auth')

router.post('/register', validateRegisterData, registerCtrl)
router.post('/login', validateLoginData, loginCtrl)
router.put('/:id', checkAuth, userExist, checkUserPermission, validateUpdateUserData, updateUserCtrl)

module.exports = router