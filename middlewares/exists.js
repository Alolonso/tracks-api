const handleErrorResponse = require('../utils/handleError')
const userModel = require('../models/user')
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

module.exports = { userExist }