const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurants = require('./restaurant')

const port = 3000

// setting mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('MongoDB is connected.'))

// setting view engine by handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// start and listen server
app.listen(port, () => {
  console.log(`This website is running on http://localhost:${port}`)
})