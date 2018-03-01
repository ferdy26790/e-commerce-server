var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transactionController')

router.post('/', transactionController.addTransaction)
router.get('/', transactionController.getTransactions)
module.exports = router;
