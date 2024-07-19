const mongoose = require('mongoose')

const dbConnect = () => {
  const DB_URI = process.env.DB_URI
  mongoose.connect(DB_URI).catch(error => console.log(error))
  mongoose.connection.on('connected', () => console.log('connected'));
}

module.exports = dbConnect