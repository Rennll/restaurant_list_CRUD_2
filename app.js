const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

// setting mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('MongoDB is connected.'))

// setting view engine by handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// setting routes
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, isSearchExist: true }))
    .catch(err => console.error(err))
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  // $regex 提供了在查詢 (query) 中找到符合的字串
  // $options: 'i' 代表大小寫皆可
  // $or 代表任一條件符合皆可
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { name_en: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, isSearchExist: restaurants.length, keyword }))
    .catch(err => console.error(err))
})

// view a restaurant's detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.error(err))
})

// routes to new a item page
app.get('/restaurants', (req, res) => {
  res.render('new')
})

// add a restaurant
app.post('/restaurants', (req, res) => {
  const restaurant = req.body

  return Restaurant.create({ ...restaurant })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// to a restaurant edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})

// edited a restaurant and update: use method override
app.put('/restaurants/:id', (req, res) => {
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
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
})

// start and listen server
app.listen(port, () => {
  console.log(`This website is running on http://localhost:${port}`)
})