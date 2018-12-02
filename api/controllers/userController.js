const db = require('../models/dbconnection');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user_id, done) => {
    done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});


var userController = {

    // register function pulls parameters from request body
    register: (req, res) => {

        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let passwordMatch = req.body.passwordMatch;
        let dateRegistered = new Date();
        let party = "IND";

        

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
                    }
                    db.query('SELECT LAST_INSERT_ID() as user_id FROM voters', (error, results, fields) => {
                        const user_id = results[0];
                        console.log(user_id);
                        req.login(user_id, (err) => {
                            res.redirect('../../dashboard.html')
                        }); //end session login
                    }); // end id query
                    } // end register query callback
                ); // end register query
            }); // end bcrypt
        } // end else
    }, // end register function

    // login function, pulls params from req body
    login: (req, res) => {
        // Login handled by passport.js in server.js
    }, // end login function
    getBallot: (req, res) => {
        var results = db.query(`SELECT o.office_id, o.legislature_id, o.district, e.type, e.date, ec.candidate_id, ec.isIncumbent
        FROM
            user_ballot ub LEFT JOIN offices o
                ON ub.office_id = o.office_id
            LEFT JOIN elections e
                ON o.office_id = e.office_id
            LEFT JOIN election_candidates ec
                ON e.election_id = ec.election_id
        WHERE ub.user_id = ?;`, [req.body.user_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    } // end getBallot
}; // end class

module.exports = userController;