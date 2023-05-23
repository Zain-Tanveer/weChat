const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  to: {
    type: mongoose.Types.ObjectId,
    required: [true, 'other user id'],
    ref: 'User',
  },
  from: {
    type: mongoose.Types.ObjectId,
    required: [true, 'user id'],
    ref: 'User',
  },
  message: { type: String },
  createdAt: { type: Date },
})

module.exports = mongoose.model('Chat', ChatSchema)
