const bcrypt = require('bcrypt')

const encrypt = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10) 
}

const compare = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
}

module.exports = { encrypt, compare }