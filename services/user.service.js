const { NotFoundError } = require('../errors')
const User = require('../models/User')

exports.getUser = async (data) => {
  const { user_id } = data.user

  const user = await User.findById(user_id)
  if (!user) {
    throw new NotFoundError('user does not exist')
  }

  return user
}
