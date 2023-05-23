const { BadRequestError, NotFoundError } = require('../errors')

const User = require('../models/User')
const Inbox = require('../models/Inbox')

exports.getInboxUsers = async (data) => {
  const { user_id } = data

  const user = await User.findById(user_id).populate('inbox_users')
  if (!user) {
    throw new NotFoundError('user does not exist')
  }

  return user.inbox_users
}

exports.addInboxUser = async (data) => {
  const { email, user_id } = data.user
  const { friend_email } = data.body

  if (email === friend_email) {
    throw new BadRequestError('you have provided your own email')
  }

  const friend = await User.findOne({ email: friend_email })
  if (!friend) {
    throw new NotFoundError('user does not exist')
  }

  const user = await User.findById(user_id)

  user.inbox_users.forEach((inbox_user) => {
    if (inbox_user.equals(friend._id)) {
      throw new BadRequestError(
        'you already have started a conversation with this user'
      )
    }
  })

  const inbox_user = await Inbox.create({
    friend_id: friend._id,
    friend_name: friend.name,
    friend_image: friend.image,
  })

  user.inbox_users.push(inbox_user._id)
  user.save()

  return inbox_user
}

exports.deleteInboxUser = async (data) => {
  return { message: 'delete inbox user' }
}
