const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError
