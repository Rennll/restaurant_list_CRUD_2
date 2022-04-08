const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  name: {
    type: 'string',
    required: true
  },
  name_en: {
    type: 'string',
    required: true
  },
  category: {
    type: 'string',
    required: false
  },
  image: {
    type: 'string',
    required: false
  },
  location: {
    type: 'string',
    required: false
  },
  phone: {
    type: 'string',
    required: false
  },
  google_map: {
    type: 'string',
    required: false
  },
  rating: {
    type: 'number',
    required: false
  },
  description:{
    type: 'string',
    required: false
  }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)