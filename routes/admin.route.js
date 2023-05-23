const express = require('express')
const router = express.Router()

const admin = require('../controllers/admin.controller')

router.route('/getUsers').get(admin.getAllUsers)
router.route('/getUser/:user_id').get(admin.getUser)

module.exports = router