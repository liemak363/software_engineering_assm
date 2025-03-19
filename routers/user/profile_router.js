const express = require('express')
const router = express.Router();

const {verify_user} = require("../../middlewares/verify_midware");

const profileController = require("../../controllers/user/profile_controller")

router.get('/', verify_user, profileController.home)

module.exports = router