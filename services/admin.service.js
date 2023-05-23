const User = require('../models/User')

const { NotFoundError } = require('../errors')

exports.getAllUsers = async () => {
  const users = await User.find({ role: { $ne: 'Admin' } }).sort('-updatedAt')
  return users
}

exports.getUser = async (data) => {
  const { user_id } = data
  const user = (
    await User.findOne({ _id: user_id }).select('-password -__v')
  ).toObject()

  if (!user) {
    throw new NotFoundError(`User not found`)
  }

  return user
}
