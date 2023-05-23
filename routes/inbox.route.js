const express = require('express')
const router = express.Router()

const inbox = require('../controllers/inbox.controller')

router.route('/getInboxUsers').get(inbox.getInboxUsers)
router.route('/addInboxUser').post(inbox.addInboxUser)
router.route('/deleteInboxUser').delete(inbox.deleteInboxUser)

module.exports = router