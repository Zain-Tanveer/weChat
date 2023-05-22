const jwt = require('jsonwebtoken')

const { UnauthenticatedError } = require('../errors')

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authorization Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      user_id: payload.user_id,
      email: payload.email,
      name: payload.name,
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authorization Invalid')
  }
}

module.exports = authenticate
