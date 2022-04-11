const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')

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

// setting static files, body-parser, method-override
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// setting routes
app.use(routes)

// start and listen server
app.listen(port, () => {
  console.log(`This website is running on http://localhost:${port}`)
})