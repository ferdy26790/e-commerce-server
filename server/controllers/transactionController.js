const transactionModel = require('../models/Transaction')
const jwt = require('jsonwebtoken')
const getDecode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECURITY, function(err, decode) {
      if(!err) {
        resolve(decode)
      } else {
        reject(err)
      }
    })
  })
}
class Transaction{
  static addTransaction(req, res) {
    console.log('masuk', req.headers.token);
    getDecode(req.headers.token)
    .then((decode) => {
      console.log(decode, 'ini decode');
      let newTransaction = new transactionModel({
        userId : decode.id,
        items : req.body.itemId,
        totalPrice: req.body.totalPrice
      })
      newTransaction.save()
      .then((transactionCreated) => {
        res.status(200).json({
          transaction: transactionCreated
        })
      }).catch((err) => {
        res.status(500).send(err)
      })
    }).catch((err) => {
      console.log('masuk', err);
      res.status(500).send(err)
    })
  }
  static getTransactions(req, res) {
    getDecode(req.headers.token)
    .then((decode) => {
      transactionModel.find({userId: decode.id})
      .populate('items.item', ['name', 'price'])
      .then((transactions) => {
        res.status(200).json({
          transactions: transactions
        })
      }).catch(() => {

      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = Transaction  ;
