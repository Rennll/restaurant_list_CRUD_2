const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmedPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.render('register', {
          name,
          email,
          password,
          confirmedPassword
        })
      }
      if (password !== confirmedPassword) {
        return res.render('register', {
          name,
          email,
          password,
          confirmedPassword
        })
      }
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/users/login'))
    })
    .catch(err => console.error(err))
})

router.get('/logout', (req, res) => {
  // logout
})

module.exports = router
