var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var validator = expressValidator();
var port = process.env.PORT || 3000;
var path = require('path');
const ENV = require('dotenv').config();
var bodyParser = require('body-parser');
const session = require('express-session');
const MYSQLstore = require('express-mysql-session')(session);
// const uid = require('uuid/v4');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

app.listen(port);
console.log('Election App RESTful API server started on: ' + port);

// Use bodyparser for passing data through forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use validation on registration forms
app.use(validator);

// MySQL store options
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
};

var storeSession = new MYSQLstore(options);

// Use express-session
app.use(session({
    secret: process.env.sessionSecret,
    store: storeSession,
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local
passport.use(new LocalStrategy({passReqToCallback: false, usernameField: 'email'}, function(email, password, done) {
    console.log(email);
    console.log(password);
    const db = require('./models/dbconnection.js');

    db.query('SELECT voter_id, voter_password FROM voters WHERE email = ?', [email], (err, results) => {
        console.log(results[0]);
        if (err) {
            done(err);
        }
        if (results.length === 0) {
            console.log('User not found')
            done(null, false);
        }
        else {
            const hash = results[0].voter_password.toString();
            console.log(hash);
            bcrypt.compare(password, hash, (err, response) => {
                if (response === true) {
                    return done(null, {user_id: results[0].voter_id});
                }
                else {
                    console.log('Incorrect password')
                    return done(null, false);
                }
            });
        }
    });
}));


// R O U T E S

// Return 204 for favicon requests
app.use('/favicon.ico', (req, res) => {
    return res.sendStatus(204);
})

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

// Pass endorsements related route requests to endorsementsRoutes.js module
var endorsements = require('./routes/endorsementsRoutes.js');
app.use('/endorsements', endorsements);