const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/endorsementsController.js');

ROUTER.get('/', controller.getEndorsements);
ROUTER.post('/', controller.postEndorsement);
ROUTER.delete('/', controller.deleteEndorsement);

ROUTER.get('/candidate/:id', controller.getEndorsementByCandidate);

ROUTER.get('/users/:id', controller.getEndorsementsByUser);

module.exports = ROUTER;