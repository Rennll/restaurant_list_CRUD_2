const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// routes to new a item page: merge new.hbs to edit.hbs
router.get('/new', (req, res) => {
  return res.render('edit')
})

// add a restaurant
router.post('/', (req, res) => {
  const restaurant = req.body
  Object.assign(restaurant, { userId: res.locals.user._id })

  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// view a restaurant's detail page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = res.locals.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.error(err))
})

// to a restaurant edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = res.locals.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant, isEditPage: true }))
    .catch(err => console.error(err))
})

// edited a restaurant and update: use method override
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const restaurant = req.body
  const userId = res.locals.user._id

  return Restaurant.findOne({ _id, userId })
    .then(item => {
      for (const key in restaurant) {
        item[key] = restaurant[key]
      }
      return item.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.error(err))
})

// delete a restaurant: use method override
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = res.locals.user._id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
})

module.exports = router
