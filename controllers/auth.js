const fs = require('fs')
const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const userModel = require('../models/user')
const trackModel = require('../models/track')
const storageModel = require('../models/storage')
const { encrypt, compare } = require('../utils/handlePass')
const { tokenSign } = require('../utils/handleToken')

const MEDIA_PATH = `${__dirname}/../storage`

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const userExists = await userModel.findOne({ email: req.email })
    if (userExists) {
      handleErrorResponse(res, 'The user already exists', 401)
      return
    }
    const pass = await encrypt(req.password)
    const body = { ...req, password: pass }
    const data = await userModel.create(body)
    res.send(data)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await userModel.findOne({ email: req.email })
    if (!user) {
      handleErrorResponse(res, `User doesn't exist`, 401)
      return
    }
    const checkPassword = await compare(req.password, user.password)
    if (!checkPassword) {
      handleErrorResponse(res, `Incorrect password`, 401)
      return
    }
    const token = await tokenSign(user)
    const data = {
      token: token,
      user: user
    }
    res.send(data)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const updateUserCtrl = async (req, res) => {
  try {
    userToEdit = req.userToEdit
    req = matchedData(req)

    if (req.email) {
      const userExists = await userModel.findOne({ email: req.email })
      if (userExists) {
        handleErrorResponse(res, 'The email is already in use', 409)
        return
      }
    }

    if (req.password) {
      req.password = await encrypt(req.password)
    }

    const userUpdated = await userModel.findOneAndUpdate({ _id: userToEdit._id }, req, { new: true })
  
    res.send(userUpdated)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const deleteUserCtrl = async (req, res) => {
  try {
    userToEdit = req.userToEdit
    
    const tracksToDelete = await trackModel.find({ userId: userToEdit._id })

    if (tracksToDelete) {
      tracksToDelete.map(async track => {
        if (track.mediaId) {
          const fileToDelete = await storageModel.findByIdAndDelete(track.mediaId)
          const filePath = `${MEDIA_PATH}/${fileToDelete.filename}`
          fs.unlinkSync(filePath)
        }
      })
    }
    
    const tracksDeleted = await trackModel.deleteMany({ userId: userToEdit._id })
    const userDeleted = await userModel.findByIdAndDelete( userToEdit._id )

    res.send({ userDeleted, tracksDeleted })
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { registerCtrl, loginCtrl, updateUserCtrl, deleteUserCtrl }