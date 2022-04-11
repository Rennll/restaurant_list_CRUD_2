const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant').results
const db = require('../../config/mongoose')

// setting mongoose only on open
db.once('open', () => {
  // generate Restaurant seeds
  Restaurant.create([...restaurants])
  console.log('Done.')
})
