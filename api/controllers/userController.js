const db = require('../models/dbconnection');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var LocalStrategy = require('passport-local').Strategy;
const https = require('https');



var userController = {

    // register function pulls parameters from request body
    register: (req, res) => {

        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let passwordMatch = req.body.passwordMatch;
        let dateRegistered = new Date();
        let party = req.body.partySelector;

        let address1 = req.body.address1;
        let address2 = req.body.address2;
        let city = req.body.city;
        let state = req.body.state;
        let zip = req.body.zip;
        
        if (address2) {
            var address = address1 + ' ' + address2 + ' ' + city + ' ' + state + ' ' + zip;
        }
        else {
            var address = address1 + ' ' + city + ' ' + state + ' ' + zip;
        }

        

        req.check('email', 'Email field cannot be empty.').not().isEmpty();
        req.check('email', 'Invalid email').isEmail();
        req.check('firstName', 'First name is required.').not().isEmpty();
        req.check('lastName', 'Last name is required.').not().isEmpty();
        req.check('password', 'Password field is required').not().isEmpty();
        req.check('password', 'Password must be between 8-100 characters.').isLength(8, 100);
        req.check('passwordMatch', 'Passwords do not match.').equals(req.body.passwordMatch);


        let errors = req.validationErrors();

        if (errors) {
            console.log(errors);
            console.log(req.body.password);
            console.log(password);
            console.log(req.body.email);
            console.log(email);
            console.log(party);
            res.send(errors);
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                db.query('INSERT INTO voters (email, voter_password, date_registered, firstName, lastName, party_id) VALUES (?, ?, ?, ?, ?, ?)', [email, hash, dateRegistered, firstName, lastName, party], function(err, results) {
                    if (err) {
                       console.log(err);
                       res.send(err);
                    }
                    else {
                        console.log("Registration complete!");
                        db.query('SELECT LAST_INSERT_ID() as id FROM voters', (error, results, fields) => {
                            const user = results[0];
                            console.log('Results of select last id: ' + results);
                            console.log('Id variable: ' + user.id);
                            req.login(user, (err) => {
                                if (err) {
                                    console.log(user.id);
                                    console.log('LOGIN ERROR: ' + err);
                                    res.send(err);
                                }
                                else {
                                // BUILD USER BALLOT
                                    db.query(`INSERT INTO user_ballot (voter_id, office_id) VALUES (?, ?)`, [user.id, '1'], (error, results) => {
                                        if (error) {
                                            console.log('BUILD USER BALLOT ERROR: ' + error);
                                            console.log(user.id);
                                            res.send(error);
                                        }
                                        else {
                                            console.log(user.id);
                                            console.log(address);
                                            userController.getDivisionsOnRegister(address);
                                            res.redirect('../dashboard.html');
                                        }
                                    });
                                }
                            }); //end session login
                        }); // end id query
                    }
                    } // end register query callback
                ); // end register query
            }); // end bcrypt
        } // end else
    }, // end register function

    // login function, pulls params from req body
    login: (req, res) => {
        // Login handled by passport.js in server.js
    }, // end login function

    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.status(401).json({'message': 'Access denied'});
        }
    },

    getUserInfo: (req, res) => {
        var results = db.query(`SELECT firstName, lastName, party_id FROM voters WHERE voter_id = ?`, [req.user.voter_id], (err, results) => {
            if (err) {
                console.log(err);
                console.log(results);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    },


    getBallot: (req, res) => {
        var results = db.query(`select c.candidate_id, c.firstName, c.lastName, p.name AS party_name,
        l.name as legis_name, e.election_id, o.district
        from candidates c
            left join parties p	
                on c.party_id = p.party_id
            left join election_candidates ec
                on c.candidate_id = ec.candidate_id
            left join elections e
                on ec.election_id = e.election_id
            left join offices o 
                on e.office_id = o.office_id
            left join legislatures l
                on o.legislature_id = l.legislature_id
        where e.office_id in (
        select office_id from user_ballot
        where voter_id = ?);`, [req.user.voter_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    }, // end getBallot

    getDivisionsOnRegister: (address) => {
        var body = '';
        result = {};
        console.log('getDivisionsOnRegister called!');
        let url = 'https://www.googleapis.com/civicinfo/v2/representatives?key='+process.env.CIVIC_KEY+'&address='+address;
        https.get(url, (res) => {
            res.on('data', (d) => {
                body += d.toString('utf8');
           });

            res.on('end', () => {
                console.log('Inside end: ' + body);
             });
             console.log('Outside of end, inside of get: ' + body);
        });
        console.log('Outside of get: ' + body);
    }
}; // end class

module.exports = userController;