const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth')
const { trackFileExist } = require('../middlewares/exists')
const { checkTrackPermission } = require('../middlewares/permissions')
const fileManagement = require('../middlewares/errors')

const {
  createFileCtrl
} = require('../controllers/storage')

router.post('/', checkAuth, trackFileExist, checkTrackPermission, fileManagement , createFileCtrl)

module.exports = router