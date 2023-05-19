const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')

router.route('/getUser').get(user.getUser)

module.exports = router
