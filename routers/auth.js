const express = require('express')
const session = require('express-session')
const passport = require('passport')
require('../passport/auth')

const authRouters = express.Router()

authRouters.use(session({ secret: 'cats', resave: false, saveUninitialized: true }))
authRouters.use(passport.initialize())
authRouters.use(passport.session())

authRouters.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

authRouters.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failure'
    })
)

authRouters.get('/failure', (req, res) => {
    res.send('Something went wrong...')
})

authRouters.get('/profile', (req, res, next) => {
    if (req.user) {
        res.json({
            message: 'Đăng nhập thành công',
            link: '/auth/logout',
            isLogin: true,
            user: req.user,
        })
    } else {
        res.json({
            message: 'Bạn chưa đăng nhập',
            link: '/auth/google',
            isLogin: false,

        })
    }
})

authRouters.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/')
})
module.exports = authRouters