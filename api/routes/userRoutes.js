// user routes 

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/userController');

ROUTER.post('/register+:email+:password+:fname+:lname', controller.register);

module.exports = ROUTER;