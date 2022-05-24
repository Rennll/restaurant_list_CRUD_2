module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('warning_msg', '必須先登入才能瀏覽餐廳內容。')
    return res.redirect('/users/login')
  }
}
