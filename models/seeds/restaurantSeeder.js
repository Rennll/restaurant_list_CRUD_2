const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant')
const db = require('../../config/mongoose')

// setting mongoose only on open
db.once('open', () => {
  const restaurants = restaurantList.results

  // generate Restaurant seeds
  for (const restaurant of restaurants) {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description 
    })
  }
  console.log('Done.')
})