const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// view a restaurant's detail page
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.error(err))
})

// routes to new a item page
router.get('/', (req, res) => {
  res.render('new')
})

// add a restaurant
router.post('/', (req, res) => {
  const restaurant = req.body

  return Restaurant.create({ ...restaurant })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// to a restaurant edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})

// edited a restaurant and update: use method override
router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurant = req.body

  return Restaurant.findById(id)
    .then(item => {
      for (const key in restaurant) {
        item[key] = restaurant[key]
      }
      return item.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.error(err))
})

// delete a restaurant: use method override
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
})

module.exports = router