const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/endorsementsController.js');
var user = require('../controllers/userController');

ROUTER.get('/', controller.getEndorsements);

ROUTER.get('/candidate/:id', user.isLoggedIn, controller.getEndorsementByCandidate);

ROUTER.get('/users', user.isLoggedIn, controller.getMyEndorsements);
ROUTER.post('/users', user.isLoggedIn, controller.postEndorsement);
ROUTER.delete('/users', user.isLoggedIn, controller.deleteEndorsement);
ROUTER.get('/users/:id', controller.getEndorsementsByUser);

module.exports = ROUTER;