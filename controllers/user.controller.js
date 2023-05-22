const { StatusCodes } = require('http-status-codes')
const userService = require('../services/user.service')

exports.getUser = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await userService.getUser(req)
    )
}