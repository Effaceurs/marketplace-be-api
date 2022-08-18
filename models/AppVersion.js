const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appVersionSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  provider: {
    type: { type: Schema.Types.ObjectId, refPath: 'model_type' },
    model_type: { type: String, enum: ['k8s', 'Yandex'], required: true }
  },
  version: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('appversions', appVersionSchema)
