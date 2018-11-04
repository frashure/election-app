var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var expressValidator = require('express-validator');
var validator = expressValidator();
const ENV = require('dotenv').config();
var bodyParser = require('body-parser');
const session = require('express-session');
const uid = require('uuid/v4');

app.listen(port);
console.log('Election App RESTful API server started on: ' + port);

// Use bodyparsey for passing data through forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use validation on registration forms
app.use(validator);




// R O U T E S

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

// Pass user related route requests to userRoutes.js module
var users = require('./routes/userRoutes.js');
app.use('/user', users);