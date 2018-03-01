var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  stock: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
