var db = require('../models/dbconnection');
var validator = require('express-validator');

var userController = {
    register: function (req, res) {

        // req.checkBody(req.params.email, 'Username field cannot be empty').notEmpty();

        const email = '"' + req.params.email + '"';
        const password = '"' + req.params.password + '"';
        const dateRegistered = new Date();
        const fName = '"' + req.params.fname + '"';
        const lName = '"' + req.params.lname + '"';
        
        
        var results = db.query('INSERT INTO voters (email, voter_password, date_registered, fName, lName) VALUES (?, ?, ?, ?, ?)', [email, password, dateRegistered, fName, lName], function(err, results) {
            if (err) {
               console.log(err)
            }
            else {
                console.log("Registration complete!");
            }
            } // end query callback
        ); //end query
    } // end register function
} // end class

module.exports = userController;