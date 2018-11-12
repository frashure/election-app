// partiesRoutes.js - Parties routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const db = require('../models/dbconnection');
const controller = require('../controllers/partyController');

ROUTER.get('/', controller.getParties);

ROUTER.get('/democratic', (req, res) => {
  console.log('GET route for Democratic Party');
  res.send('GET route for Democratic Party');
});

ROUTER.get('/republican', (req, res) => {
  console.log('GET route for Republican Party');
  res.send('GET route for Republican Party');
});

ROUTER.get('/libertarian', (req, res) => {
  console.log('GET route for Libertarian Party');
  res.send('GET route for Libertarian Party');
});

ROUTER.get('/id/:party_id', controller.getPartyById);

ROUTER.get('/name/:party_name', controller.getPartyByName);
module.exports = ROUTER;
