const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/userController');
var passport = require('passport');


ROUTER.get('/register', (req, res) => {res.redirect('../register.html')});
ROUTER.post('/register', controller.register);

ROUTER.get('/login', (req, res) => {res.redirect('../login.html')});
ROUTER.post('/login', passport.authenticate('local', {successRedirect:'/dashboard.html', failureRedirect: '/user/login'}));

ROUTER.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('../');
})



module.exports = ROUTER;