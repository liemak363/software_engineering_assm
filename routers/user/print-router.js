const express = require('express')
const router = express.Router();
const {verify_user} = require("../../middlewares/verify_midware");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');   
 // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const printController = require("../../controllers/user/print_controller")

router.get('/', verify_user, printController.home)
router.post('/', verify_user, upload.single('file'), printController.print)

module.exports = router