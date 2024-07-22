const handleErrorResponse = require('../utils/handleError')
const userModel = require('../models/user')
const trackModel = require('../models/track')
const mongoose = require('mongoose')

const userExist = async (req, res, next) => {
  try {
    const userId = req.params.id
    const isValid = mongoose.Types.ObjectId.isValid(userId)

    if (!isValid) {
      handleErrorResponse(res, `Invalid userId`, 404)
      return
    }

    const user = await userModel.findById(userId)

    if (!user) {
      handleErrorResponse(res, `The user doesn't exist`, 404)
      return
    }

    req.userToEdit = user

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const trackExist = async (req, res, next) => {
  try {
    const trackId = req.params.id
    const isValid = mongoose.Types.ObjectId.isValid(trackId)

    if (!isValid) {
      handleErrorResponse(res, `Invalid trackId`, 404)
      return
    }

    const track = await trackModel.findById(trackId)

    if (!track) {
      handleErrorResponse(res, `The track doesn't exist`, 404)
      return
    }

    req.trackToEdit = track

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const trackFileExist = async (req, res, next) => {
  try {
    const trackId = req.headers.trackid
    const isValid = mongoose.Types.ObjectId.isValid(trackId)

    if (!trackId) {
      handleErrorResponse(res, `The trackId header is required`, 404)
      return
    }

    if (!isValid) {
      handleErrorResponse(res, `Invalid trackId header`, 404)
      return
    }

    const track = await trackModel.findById(trackId)

    if (!track) {
      handleErrorResponse(res, `The track doesn't exist`, 404)
      return
    }

    req.trackToEdit = track

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { userExist, trackExist, trackFileExist }