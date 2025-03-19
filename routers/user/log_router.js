const express = require('express')
const router = express.Router();

const {verify_user} = require("../../middlewares/verify_midware");

const logController = require("../../controllers/user/log_controller")

router.get('/', verify_user, logController.home)

module.exports = router