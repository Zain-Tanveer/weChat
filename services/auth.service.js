const User = require('../models/User')
const generator = require('generate-password')
const bcrypt = require('bcryptjs')

const { BadRequestError, NotFoundError } = require('../errors')

exports.register = async (data) => {
  const { email, loginWith } = data
  let { password } = data

  if (!email) {
    throw new BadRequestError('please provide an email')
  }
  if (!loginWith) {
    throw new BadRequestError('please provide loginWith')
  }
  if (loginWith !== 'signin') {
    password = generator.generate({ numbers: true, length: 10 })
  }
  if (!password) {
    throw new BadRequestError('please provide a password')
  }
  if (password.length < 6) {
    throw new BadRequestError('please provide a valid password')
  }

  const salt = await bcrypt.genSalt(10)
  data.password = await bcrypt.hash(password, salt)

  const user = await User.create({ ...data })
  user.createJWT()
  user.save()
  data = user.toObject()
  delete data.password
  delete data.__v
  delete data.role

  return data
}

exports.login = async (data) => {
  const { email, password, loginWith } = data

  if (!email) {
    throw new BadRequestError('please provide an email')
  }
  if (!loginWith) {
    throw new BadRequestError('please provide loginWith')
  }

  const user = await User.findOne({ email, loginWith })
  if (!user) {
    throw new NotFoundError('user does not exist')
  }

  user.createJWT()
  user.save()

  data = user.toObject()
  delete data.password
  delete data.__v
  delete data.role

  if (loginWith !== 'signin') {
    return data
  }

  if (!password) {
    throw new BadRequestError('please provide a password')
  }

  const isPasswordCorrect = await user.comparePasswords(password)
  if (!isPasswordCorrect) {
    throw new BadRequestError('please provide valid password')
  }
  return data
}

exports.sendOTPEmail = async (data) => {
  return { message: 'send otp email' }
}

exports.verifyOTP = async (data) => {
  return { message: 'verify otp' }
}

exports.resetPassword = async (data) => {
  return { message: 'reset password' }
}

exports.verifyUser = async (data) => {
  return { mesage: 'verify user' }
}
