if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant').results
const db = require('../../config/mongoose')
const User = require('../user')

const SEED_USERS = [{
  email: 'user1@example.com',
  password: '12345678',
  restaurants: [1, 2, 3]
}, {
  email: 'user2@example.com',
  password: '12345678',
  restaurants: [4, 5, 6]
}]

// setting mongoose only on open
db.once('open', () => {
  // generate User seed then generate restaurants
  Promise.all(Array.from(SEED_USERS, USER => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(USER.password, salt))
      .then(hash => User.create({
        email: USER.email,
        password: hash
      }))
      .then(user => {
        return Promise.all(Array.from(
          USER.restaurants,
          value => {
            const restaurant = restaurants[value - 1]
            Object.assign(restaurant, { userId: user._id })
            return Restaurant.create(restaurant)
          }))
      })
  }))
    .then(() => {
      console.log('Done.')
      process.exit()
    })
})
