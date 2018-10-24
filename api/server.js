var express = require('express');
app = express();
port = process.env.PORT || 3000;
path = require('path');
const ENV = require('dotenv').config();

app.listen(port);
console.log('Election App RESTful API server started on: ' + port);

// Serve index.html for requests to root path
var indexPath = path.join(__dirname, '../src/');
app.use('/', express.static(indexPath));

// Serve search.html for requests to /search path
var searchPath = path.join(__dirname, '../src/search.html');
app.use('/search', express.static(searchPath));

// Serve about.html for requests to /about path
var aboutPath = path.join(__dirname, '../src/about.html');
app.use('/about', express.static(aboutPath));

app.delete('/', (req, res) => res.send("Please don't try deleting the entire site. That's not cool."));

// Pass candidates route requests to candidatesRoutes.js module
var candidates = require('./routes/candidatesRoutes.js');
app.use('/candidates', candidates);

// Pass parties route requests to partiesRoutes.js module
var parties = require('./routes/partiesRoutes.js');
app.use('/parties', parties);