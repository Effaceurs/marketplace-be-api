const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/project')

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getProject)

module.exports = router
