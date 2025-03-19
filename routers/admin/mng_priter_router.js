const express = require('express')
const router = express.Router();

const {verify_admin} = require("../../middlewares/verify_midware");

const mngPrinterController = require("../../controllers/admin/mng_printer_controller")

router.get('/', verify_admin, mngPrinterController.home)
router.patch('/update_status/:id/:status', verify_admin, mngPrinterController.modifyPrinter)

module.exports = router