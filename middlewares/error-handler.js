const { StatusCodes } = require('http-status-codes')
const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set defaults
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later',
  }

  if (err.name && err.name === 'ValidationError') {
    customError.message =
      'Please provide ' +
      Object.values(err.errors)
        .map((item) => {
          if (item.message.startsWith('Path')) {
            item.message = `valid ${item.path}`
          }
          return item.message
        })
        .join(', ')
    customError.statusCode = 400
  }

  if (err.name && err.name === 'CastError') {
    if (Object.keys(err.value).indexOf('_id') !== -1) {
      customError.message = `No such entry with id : ${err.value._id}`
    } else {
      customError.message = `No such entry with id : ${err.value}`
    }
    customError.statusCode = 404
  }

  if (err.code && err.code === 11000) {
    if ('email' in err.keyValue) {
      customError.message = 'user with this email already exists'
    } else if ('appleId' in err.keyValue) {
      customError.message = 'user with this apple Id already exists'
    } else {
      customError.message = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`
    }
    customError.statusCode = 400
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // console.log(err)
  return res.status(customError.statusCode).json({ msg: customError.message })
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = ErrorHandlerMiddleware
