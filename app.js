const express = require('express')
const app = express()

const port = 3000

// setting routes
app.get('/', (req, res) => {
  res.send('this is CRUD restaurant list.')
})

// start and listen server
app.listen(port, () => {
  console.log(`This website is running on http://localhost:${port}`)
})