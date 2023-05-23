const { StatusCodes } = require('http-status-codes')

const adminService = require('../services/admin.service')

exports.getAllUsers = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await adminService.getAllUsers()
    )
}

exports.getUser = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await adminService.getUser(req.params)
    )
}
