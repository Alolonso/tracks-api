const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const userModel = require('../models/user')
const { encrypt, compare } = require('../utils/handlePass')
const { tokenSign } = require('../utils/handleToken')

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

module.exports = { registerCtrl, loginCtrl, updateUserCtrl }