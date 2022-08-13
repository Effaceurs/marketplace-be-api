const express = require('express');
const router = express.Router();
const passport = require('passport')
const controller = require('../controllers/appVersion');

router.get('/',passport.authenticate('jwt', {session: false}), controller.get);

module.exports = router;
