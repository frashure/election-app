// candidatesRoutes.js - Candidates routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var candidatesController = require('../controllers/candidateController');

// GET all candidates
ROUTER.get('/', candidatesController.getAllCandidates);

// GET candidate by ID
ROUTER.get('/id/:id', candidatesController.getCandidatesById);

// GET all candidates by party
ROUTER.get('/party/:party', candidatesController.getCandidatesByParty);

// GET candidates by election only
ROUTER.get('/election/:legislature_id', candidatesController.getCandidatesByElection);

// GET candidates by election and party
ROUTER.get('/election/:legislature_id/party/:party_name', candidatesController.getCandidatesByElectionParty);

// GET all candidates by state

// GET all candidates by office



module.exports = ROUTER;
