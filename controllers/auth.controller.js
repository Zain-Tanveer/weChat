const { StatusCodes } = require("http-status-codes")
const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    return res.status(StatusCodes.CREATED).json(
        await authService.register(req.body)
    )
}

exports.login = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await authService.login(req.body)
    )
}

exports.sendOTPEmail = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await authService.sendOTPEmail(req.body)
    )
}

exports.verifyOTP = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await authService.verifyOTP(req.body)
    )
}

exports.resetPassword = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await authService.resetPassword(req.body)
    )
}

exports.verifyUser = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await authService.verifyUser(req.query)
    )
}