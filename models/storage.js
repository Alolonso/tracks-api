const mongoose = require('mongoose')

const storageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    trackId: { type: mongoose.Types.ObjectId, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('storage', storageSchema)