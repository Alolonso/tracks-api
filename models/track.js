const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    album: { type: String, default: null },
    artist: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    mediaId: { type: mongoose.Types.ObjectId, ref: 'storage', default: null },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('tracks', trackSchema)