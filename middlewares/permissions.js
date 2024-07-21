const handleErrorResponse = require('../utils/handleError')

const checkUserPermission = async (req, res, next) => {
  try {
    const userAuth = req.userAuth
    const userToEdit = req.userToEdit
    
    if (userAuth.role == 'user') {
      if (userToEdit._id.toString() != userAuth._id.toString()) {
        handleErrorResponse(res, `You don't have permission to manipulate this user`, 401)
        return
      }
    }

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

const checkTrackPermission = async (req, res, next) => {
  try {
    const userAuth = req.userAuth
    const trackToEdit = req.trackToEdit
    
    if (userAuth.role == 'user') {
      if (trackToEdit.userId.toString() != userAuth._id.toString()) {
        handleErrorResponse(res, `You don't have permission to manipulate this user`, 401)
        return
      }
    }

    next()
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { checkUserPermission, checkTrackPermission }