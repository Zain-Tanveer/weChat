const { StatusCodes } = require('http-status-codes')

const inboxService = require('../services/inbox.service')

exports.getInboxUsers = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await inboxService.getInboxUsers(req.user)
    )
}

exports.addInboxUser = async (req, res) => {
    return res.status(StatusCodes.CREATED).json(
        await inboxService.addInboxUser(req)
    )
}

exports.deleteInboxUser = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await inboxService.deleteInboxUser(req)
    )
}