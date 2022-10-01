const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const router = require('express').Router(); 

// auth login 
router.get('/login', (req, res) => {
   res.render('login');  
});

// auth logout 
router.get('/logout', (req, res) => {
    // handle with passport 
    res.send('logging out');
})

// auth with google 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback routes for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the callback uri');
})

module.exports = router; 