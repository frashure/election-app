// candidatesRoutes.js - Candidates routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var candidatesController = require('../controllers/candidateController');

// Candidates GET route, all candidates
ROUTER.get('/', candidatesController.getAllCandidates);
ROUTER.get('/id=:id', candidatesController.getCandidatesById);
ROUTER.get('/party=:party', candidatesController.getCandidatesByParty);



// Candidates DELETE route
ROUTER.delete('/', (req, res) => {
  res.send("Candidates DELETE router successful!");
});

module.exports = ROUTER;
