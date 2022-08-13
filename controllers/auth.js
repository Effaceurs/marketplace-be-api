const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  })

  if (candidate) {
    // check password
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // generate token
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Incorrect password'
      })
    }
  } else {
    // no user found
    res.status(404).json({
      message: 'User has not been found'
    })
  }
};

module.exports.register = async function (req, res) {
  console.log('body',req.body)
  const candidate = await User.findOne({ email: req.body.email });
  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  // user exist - throw error
  if (candidate) {
    res.status(409).json({
      message: 'this email is occupied',
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e)
    }
  }
};
