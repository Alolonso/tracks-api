const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const trackModel = require('../models/track')

const createTrackCtrl = async (req, res) => {
  try {
    const userAuth = req.userAuth
    req = matchedData(req)

    if (req.album == '') {
      req.album = null
    }

    const data = await trackModel.create({...req, userId: userAuth._id})
    res.send(data)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const updateTrackCtrl = async (req, res) => {
  try {
    trackToEdit = req.trackToEdit
    req = matchedData(req)
  
    if (req.album == '') {
      req.album = null
    }
  
    const trackUpdated = await trackModel.findOneAndUpdate({ _id: trackToEdit._id }, req, { new: true })
  
    res.send(trackUpdated)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { createTrackCtrl, updateTrackCtrl }