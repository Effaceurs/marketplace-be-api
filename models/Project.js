const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('projects', projectSchema)
