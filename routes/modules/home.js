const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 將根目錄裡面的 route 放在這
router.get('/', (req, res) => {
  const userId = res.locals.user._id

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants, isResultExist: true }))
    .catch(err => console.error(err))
})

// search
router.get('/search', (req, res) => {
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
    .then(restaurants => res.render('index', { restaurants, isResultExist: restaurants.length, keyword }))
    .catch(err => console.error(err))
})

// index sort by button
router.get('/:sort', (req, res) => {
  const sortByKey = req.params.sort.split('_')
  const sort = sortByKey[1] === 'asc' ? sortByKey[0] : '-' + sortByKey[0]

  Restaurant.find()
    .sort(sort)
    .lean()
    .then(restaurants => res.render('index', { restaurants, isResultExist: true }))
    .catch(err => console.error(err))
})

module.exports = router
