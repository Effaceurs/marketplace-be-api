const mongoose = require('mongoose')
const Schema = mongoose.Schema
const applicationSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  replicas: {
    type: Number
  },
  url: {
    type: String
  },
  version: {
    type: String
  },
  user: {
    type: String
  },
  status: {
    type: String
  },
  provider: {
    type: String
  },
  project: {
    type: String
  }
})

module.exports = mongoose.model('applications', applicationSchema)
