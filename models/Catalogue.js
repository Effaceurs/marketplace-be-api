const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catalogueSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  provider: {
    type: String,
  }
})

module.exports = mongoose.model('catalogues', catalogueSchema)