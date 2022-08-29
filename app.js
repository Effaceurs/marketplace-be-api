const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const mongoose = require('mongoose')

const keys = require('./config/keys')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

const authRoutes = require('./routes/auth')
const catalogueRoutes = require('./routes/catalogue')
const applicationRoutes = require('./routes/application')
const projectRoutes = require('./routes/project')
const deployRoutes = require('./routes/deploy')
const providerRoutes = require('./routes/provider')
const appVersionRoutes = require('./routes/appVersion')


mongoose.connect(keys.mongiURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/catalogue', catalogueRoutes)
app.use('/api/application', applicationRoutes)
app.use('/api/deploy', deployRoutes)
app.use('/api/provider', providerRoutes)
app.use('/api/appversion', appVersionRoutes)
app.use('/api/project', projectRoutes)

module.exports = app
