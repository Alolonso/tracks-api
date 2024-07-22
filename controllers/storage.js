const fs = require('fs')
const handleErrorResponse = require('../utils/handleError')
const storageModel = require('../models/storage')
const trackModel = require('../models/track')

const URL_PUBLIC = process.env.URL_PUBLIC || null
const MEDIA_PATH = `${__dirname}/../storage`

const createFileCtrl = async (req, res) => {
  try {
    const { file, trackToEdit, uploadError } = req

    if (uploadError) {
      handleErrorResponse(res, req.uploadError, 409)
      return
    }

    const body = {
      url: `${URL_PUBLIC}/${file.filename}`,
      filename: file.filename,
      trackId: trackToEdit._id
    }

    if (trackToEdit.mediaId) {
      const fileToDelete = await storageModel.findById(trackToEdit.mediaId)
      const filePath = `${MEDIA_PATH}/${fileToDelete.filename}`
      fs.unlinkSync(filePath)
      const fileUpdated = await storageModel.findOneAndUpdate({ _id: trackToEdit.mediaId }, body, { new: true })

      res.send({
        fileUpdated,
      })
    }

    const fileCreated = await storageModel.create(body)
    const newTrack = { ...trackToEdit._doc, mediaId: fileCreated._id }
    const trackUpdated = await trackModel.findOneAndUpdate({ _id: fileCreated.trackId }, newTrack, { new: true })

    res.send({
      fileCreated,
      trackUpdated
    })
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

module.exports = { createFileCtrl }