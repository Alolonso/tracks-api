const handleErrorResponse = require('../utils/handleError')
const { verifyToken } = require('../utils/handleToken')
const userModel = require('../models/user')

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleErrorResponse(res, `Required authentication`, 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)

    if (!tokenData) {
      handleErrorResponse(res, `Token id error`, 401)
      return
    }

    const user = await userModel.findById(tokenData._id)
    req.userAuth = user

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = checkAuth