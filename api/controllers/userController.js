var db = require('../models/dbconnection');
var validator = require('express-validator');

var userController = {

    // register function pulls parameters from request body
    register: function (req, res) {

        const email = req.body.email;
        const password = req.body.password;
        const fName = req.body.firstName;
        const lName = req.body.lastName;
        const passwordMatch = req.body.passwordMatch;
        const dateRegistered = new Date();
        

        req.checkBody(email, 'Username field cannot be empty.').notEmpty();
        req.checkBody(email, 'Invalid email').isEmail();
        req.checkBody(password, 'Password must be between 8-100 characters.').len(8, 100);
        req.checkBody(passwordMatch, 'Passwords do not match.').equals(password);

        if (!validationResult(req).isEmpty) {
            console.log(validationResult(req))
        }
        else {
            var results = db.query('INSERT INTO voters (email, voter_password, date_registered, fName, lName) VALUES (?, ?, ?, ?, ?)', [email, password, dateRegistered, fName, lName], function(err, results) {
                if (err) {
                   console.log(err)
                }
                else {
                    console.log("Registration complete!");
                }
                } // end query callback
            ); //end query
        }
            res.send("Registration complete!")
    } // end register function
} // end class

module.exports = userController;