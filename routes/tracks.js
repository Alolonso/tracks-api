const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth')
const { trackExist } = require('../middlewares/exists')
const { checkTrackPermission } = require('../middlewares/permissions')

const {
  validateTrackData,
  validateUpdateTrackData
} = require('../validators/tracks')

const {
  getTracksCtrl,
  createTrackCtrl,
  updateTrackCtrl,
  deleteTrackCtrl
} = require('../controllers/tracks')

router.get('/', getTracksCtrl)
router.post('/', checkAuth, validateTrackData, createTrackCtrl)
router.put('/:id', checkAuth, trackExist, checkTrackPermission, validateUpdateTrackData, updateTrackCtrl )
router.delete('/:id', checkAuth, trackExist, checkTrackPermission, deleteTrackCtrl )

module.exports = router