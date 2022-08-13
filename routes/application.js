const express = require('express');
const router = express.Router();
const passport = require('passport')
const controller = require('../controllers/application');

router.get('/',passport.authenticate('jwt', {session: false}), controller.getAll);
router.post('/',passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id',passport.authenticate('jwt', {session: false}), controller.patch);


module.exports = router;
