const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware");

const reportController = require("../../controllers/admin/report_controller")

router.get('/', verify_admin, reportController.home)

module.exports = router