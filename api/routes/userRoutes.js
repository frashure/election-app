// user routes 

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/userController');

ROUTER.get('/register', (req, res) => {res.redirect('../register.html')});
ROUTER.post('/register', controller.register);

module.exports = ROUTER;