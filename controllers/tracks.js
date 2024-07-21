const { matchedData } = require('express-validator')
const handleErrorResponse = require('../utils/handleError')
const trackModel = require('../models/track')

const createTrackCtrl = async (req, res) => {
  try {
    const userAuth = req.userAuth
    req = matchedData(req)
    const data = await trackModel.create({...req, userId: userAuth._id})
    res.send(data)
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { createTrackCtrl }