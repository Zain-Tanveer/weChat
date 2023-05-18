const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'firstName'],
      minlength: 3,
      maxLength: 40,
    },
    lastName: {
      type: String,
      required: [true, 'lastName'],
      minlength: 3,
      maxLength: 40,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password'],
      minlength: 3,
    },
    phone: {
      type: Number,
      minlength: 7,
    },
    loginWith: {
      type: String,
      required: [true, 'loginWith'],
      enum: {
        values: ['signin', 'google'],
        message: 'incorrect loginWith value',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['Candidate', 'Admin'],
        message: 'incorrect role value',
      },
      default: 'Candidate',
    },
    verifyCode: {
      type: String,
    },
    isVerified: {
      type: Number,
      enum: {
        values: [0, 1],
        message: 'incorrect isVerified value',
      },
      default: 0,
    },
    codeExpiresAt: {
      type: Date,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function () {
  this.name = `${this.firstName} ${this.lastName}`
})

UserSchema.methods.createJWT = function () {
  this.token = jwt.sign(
    {
      user_id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
