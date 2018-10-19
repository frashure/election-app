// candidatesRoutes.js - Candidates routes module

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

// Candidates GET route
ROUTER.get('/', (req, res) => {
  res.send('Candidates GET router successful!')
});

// Candidates DELETE route
ROUTER.delete('/', (req, res) => {
  res.send("Candidates DELETE router successful!");
});

module.exports = ROUTER;
