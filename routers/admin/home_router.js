const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware");

const homeController = require("../../controllers/admin/home_controller")

router.get('/', verify_admin, homeController.home)

module.exports = router