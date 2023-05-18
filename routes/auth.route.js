const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth.controller')

router.route('/register').post(auth.register)
router.route('/login').post(auth.login)
router.route('/sendOTPEmail').post(auth.sendOTPEmail)
router.route('/verifyOTP').post(auth.verifyOTP)
router.route('/resetPassword').post(auth.resetPassword)
router.route('/verifyUser').post(auth.verifyUser)

module.exports = router
