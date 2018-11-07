const EXPRESS = require('express');
const ROUTER = EXPRESS.router();
var controller = requires('../controllers/endorsementsController.js');

ROUTER.get('/', controller.getEndorsements);
ROUTER.post('/', controller.postEndorsement);