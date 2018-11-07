const db = require('../models/dbconnection');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var userController = {

    // register function pulls parameters from request body
    register: function (req, res) {

        let email = req.body.email;
        let password = req.body.password;
        let fName = req.body.firstName;
        let lName = req.body.lastName;
        let passwordMatch = req.body.passwordMatch;
        let dateRegistered = new Date();    
        

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
            res.send(errors);
            console.log(req.body.password);
            console.log(password);
            console.log(req.body.email);
            console.log(email);

        }
        else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                db.query('INSERT INTO voters (email, voter_password, date_registered, fName, lName) VALUES (?, ?, ?, ?, ?)', [email, hash, dateRegistered, fName, lName], function(err, results) {
                    if (err) {
                       console.log(err);
                       res.send(err);
                    }
                    else {
                        console.log("Registration complete!");
                        res.send("Registration complete!");
                    }
                    } // end query callback
                ); //end query
            });
        } // end else
    }, // end register function

    // login function, pulls params from req body
    login: function (req, res) {

        
        
    } // end login function
}; // end class

module.exports = userController;