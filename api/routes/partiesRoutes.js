// partiesRoutes.js - Parties routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

// Parties GET route
ROUTER.get('/', (req, res) => {
  res.send('Parties GET router successful!')
});

// Parties DELETE route
ROUTER.delete('/', (req, res) => {
  res.send("Parties DELETE router successful!");
});

module.exports = ROUTER;
