var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    ammount: {
      type: Number
    }
  }],
  time: {
    type: Date,
    default: Date.now()
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;
