var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
/* GET users listing. */
router.post('/', userController.signUp);

module.exports = router;
