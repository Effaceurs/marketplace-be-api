const mongoose = require('mongoose')
const Schema = mongoose.Schema


const providerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('providers', providerSchema)