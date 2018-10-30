// candidatesRoutes.js - Candidates routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var candidatesController = require('../controllers/candidateController');

// GET all candidates
ROUTER.get('/', candidatesController.getAllCandidates);

// GET candidate by ID
ROUTER.get('/id=:id', candidatesController.getCandidatesById);

// GET all candidates by party
ROUTER.get('/party=:party', candidatesController.getCandidatesByParty);

// Candidates DELETE route
ROUTER.delete('/', (req, res) => {
  res.send("Candidates DELETE router successful!");
});

module.exports = ROUTER;
