const productModel = require('../models/Product')
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
class Product{
  static addProduct(req, res) {
    getDecode(req.headers.token)
      .then((decode) => {
        console.log('masuk', decode)
        if (decode.role == 'admin') {
          let newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            picture: req.file.cloudStoragePublicUrl,
            stock: req.body.stock,
            releaseDate: new Date(),
            price: req.body.price,
            category: req.body.category
          })
          newProduct.save()
          .then((productAdded) => {
            res.status(200).json({
              msg: "product added!",
              product: productAdded
            })
          }).catch((err) => {
            console.log(err);
            res.status(500).send(err)
          })
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err)
      })
  }
  static getProducts(req, res) {
    productModel.find()
    .then((products) => {
      res.status(200).json({
        products: products
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static getProductByCategory(req, res) {
    productModel.find({
      category: req.params.category
    })
    .then((products) => {
      res.status(200).json({
        products: products
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static getProduct(req, res) {
    productModel.findById(req.params.id)
    .then((product) => {
      res.status(200).json({
        product: product
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static editProduct(req, res) {
    productModel.findById(req.params.id)
    .then((product) => {
      product.name = req.body.name || product.name
      product.description = req.body.description || product.description
      product.picture = req.body.picture || product.picture
      product.stock = req.body.stock || product.stock
      product.releaseDate = req.body.releaseDate || product.releaseDate
      product.price = req.body.price || product.price
      product.category = req.body.category || product.category
      product.save()
      .then((productUpdated) => {
        res.status(200).json({
          msg: "product updated",
          product: productUpdated
        })
      }).catch((err) => {
        res.status(500).send(err)
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static deleteProduct(req, res) {
    productModel.findByIdAndRemove(req.params.id)
    .then((productDeleted) => {
      res.status(200).json({
        msg: "product deleted",
        product: productDeleted
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = Product;
