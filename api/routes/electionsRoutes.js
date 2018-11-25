const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
var controller = require('../controllers/electionController');

// GET all elections
ROUTER.get('/', controller.getElections);

// GET elections by ID
ROUTER.get('/id', controller.getElectionByID);

// GET election by office ID
ROUTER.get('/office', controller.getElectionsByOffice);

// GET candidates associated with an election ID
ROUTER.get('/election_candidates', controller.getCandidatesByElection);

// GET candidates associated with an office ID
ROUTER.get('/office_candidates', controller.getCandidatesByOffice);

// GET elections by state (includes congressional elections within state as well as local elections)
ROUTER.get('/state', controller.getElectionsByState);

module.exports = ROUTER;