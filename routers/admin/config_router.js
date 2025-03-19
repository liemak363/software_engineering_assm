const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware");

const configController = require("../../controllers/admin/config_controller")

router.get('/', verify_admin, configController.home)
router.post('/', verify_admin, configController.updateConfig)

module.exports = router