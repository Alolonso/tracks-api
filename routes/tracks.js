const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth')

const { validateTrackData } = require('../validators/tracks')

const { createTrackCtrl } = require('../controllers/tracks')

router.post('/', checkAuth, validateTrackData, createTrackCtrl)

module.exports = router