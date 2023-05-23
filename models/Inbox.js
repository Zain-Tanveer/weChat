const mongoose = require('mongoose')

const InboxSchema = new mongoose.Schema({
  friend_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'friend id'],
    ref: 'User',
  },
  friend_name: {
    type: String,
    required: [true, `friend's name`],
  },
  friend_image: {
    type: String,
  },
  last_message: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Inbox', InboxSchema)
