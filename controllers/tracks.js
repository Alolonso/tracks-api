const fs = require('fs')
const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const trackModel = require('../models/track')
const storageModel = require('../models/storage')

const MEDIA_PATH = `${__dirname}/../storage`

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

const deleteTrackCtrl = async (req, res) => {
  try {
    trackToEdit = req.trackToEdit
    let fileDeleted = {}

    if (trackToEdit.mediaId) {
      const fileToDelete = await storageModel.findById(trackToEdit.mediaId)
      const filePath = `${MEDIA_PATH}/${fileToDelete.filename}`
      fs.unlinkSync(filePath)
      fileDeleted = await storageModel.findByIdAndDelete(fileToDelete._id)
    }

    const trackDeleted = await trackModel.findByIdAndDelete(trackToEdit._id)

    res.send({ trackDeleted, fileDeleted })
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { createTrackCtrl, updateTrackCtrl, deleteTrackCtrl }