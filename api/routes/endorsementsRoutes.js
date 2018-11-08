const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/endorsementsController.js');

ROUTER.get('/', controller.getEndorsements);
ROUTER.post('/', controller.getEndorsements);

module.exports = ROUTER;