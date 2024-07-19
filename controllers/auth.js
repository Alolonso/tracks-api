const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const userModel = require('../models/user')
const { encrypt } = require('../utils/handlePass')

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

module.exports = { registerCtrl }