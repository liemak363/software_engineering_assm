const express = require('express')
const router = express.Router();
const {verify_user} = require("../../middlewares/verify_midware");

const homeController = require("../../controllers/user/home_controller")

router.get('/', verify_user, homeController.home)

module.exports = router