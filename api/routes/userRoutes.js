const { check, validationResult } = require('express-validator/check');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/userController');

ROUTER.get('/register', (req, res) => {res.redirect('../register.html')});
ROUTER.post('/register', controller.register);

ROUTER.get('/login', (req, res) => [res.redirect('../login.html')]);
ROUTER.post('/login', controller.login)

module.exports = ROUTER;