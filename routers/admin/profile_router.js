const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware");

const profileController = require("../../controllers/admin/profile_controller")

router.get('/', verify_admin, profileController.home)

module.exports = router