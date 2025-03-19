const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware.js")

const logController = require("../../controllers/admin/log_controller")

router.get('/', verify_admin, logController.home)
router.get('/filter', verify_admin, logController.filter)

module.exports = router