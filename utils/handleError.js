const handleErrorResponse = (res, message = 'Something happened', code = 500) => {
  res.status(code)
  res.send({ error: message })
}

module.exports = handleErrorResponse