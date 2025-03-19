const express = require('express')
const router = express.Router();

const {verify_user} = require("../../middlewares/verify_midware");

const buyPaperController = require("../../controllers/user/buy_paper_controller")

router.get('/', verify_user, buyPaperController.home)
router.post('/', verify_user, buyPaperController.updateBuyLog)

module.exports = router