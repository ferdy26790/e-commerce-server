const userModel = require('../models/User')
const bcrypt = require('bcrypt');
const salt = 10;
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

class User{
  static signUp(req, res) {
    if(!req.body.password) {
      res.status(422).json({
        msg: 'missing field password'
      })
    } else {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if(!err) {
          let newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: 'user'
          })
          newUser.save()
          .then((userSaved) => {
            res.status(200).json({
              user: userSaved
            })
          }).catch((err) => {
            res.status(500).send(err)
          })
        } else {
          res.status(500).send(err)
        }
      })
    }
  }
  static addUser(req, res) {
    if(!req.body.password) {
      res.status(422).json({
        msg: "missing field password"
      })
    } else {
      if(req.body.role !== 'user' && req.body.role !== 'admin') {
        res.status(417).send('invalid category')
      } else {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          let newUser = new userModel({
            name: req.body.name,
            password: hash,
            email: req.body,email,
            role: req.body.role
          })
          newUser.save()
          .then((userCreated) => {
            user: userCreated
          }).catch((err) => {
            res.status(500).send(err)
          })
        })
      }
    }
  }
  static signIn(req, res) {
    userModel.find({email: req.body.email})
    .then((user) => {
      if(user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password, function(err, response) {
          if(response) {
            jwt.sign({
              id:user[0]._id,
              name: user[0].name,
              email: user[0].email,
              role: user[0].role
            }, process.env.SECURITY, (err, token) => {
              if (!err) {
                let userData = {
                  id: user[0]._id,
                  name: user[0].name,
                  email: user[0].email,
                  role: user[0].role
                }
                res.status(200).json({
                  token: token,
                  user: userData
                })
              }
            })
            // res.status(200).json({
            //   msg: "login berhasil",
            //   user: user[0]
            // })
          } else {
            res.status(401).json({
              msg: "email / password salah"
            })
          }
        })
      } else {
        res.status(200).json({
          msg: "email tidak terdaftar"
        })
      }
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static getUsers(req, res) {
    userModel.find()
    .then((users) => {
      res.status(200).json({
        user: users
      })
    }).catch((err) => {
      res.send(500).send(err)
    })
  }
  static getUser(req, res) {
    userModel.findById(req.params.id)
    .then((user) => {
      res.status(200).json({
        user: user
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static editUser(req, res) {
    userModel.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.save()
      .then((userUpdated) => {
        res.status(200).json({
          msg: "user updated !",
          user: userUpdated
        })
      }).catch((err) => {
        res.status(500).send(err)
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static deleteUser(req, res) {
    userModel.findByIdAndRemove(req.params.id)
    .then((userDeleted) => {
      res.status(200).json({
        msg: "user deleted",
        user: userDeleted
      })
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = User;
