var db = require('../models/dbconnection');

// Create candidatesController class
var candidateController = {

    // Get all candidates
    getAllCandidates: function (req, res) {
        var results = db.query(`SELECT * FROM candidates c LEFT JOIN parties p ON c.party_id = p.party_id ORDER BY c.lName`, function (err, results) {
            if (err) {
                console.log(err);
            }

            // Create results
            // var resultsJson = JSON.stringify(results);
            // resultsJson = JSON.parse(resultsJson);
            // var apiResult = {};

            // apiResult.data = resultsJson;

            res.json(results);

          } // End callback
        ); // End db.query
    }, // End getAllCandidates

    getCandidatesById: function(req, res) {
        var results = db.query(`SELECT * FROM candidates WHERE candidate_id = ?`, [req.params.id], function (err, results) {
            if (err) {
                console.log(err);
            }

            // Create results
            var resultsJson = JSON.stringify(results);
            resultsJson = JSON.parse(resultsJson);
            var apiResult = {};

            apiResult.data = resultsJson;

            res.json(apiResult);

          } // End callback
        ); // End db.query
    }, // End getCandidatesById

    getCandidatesByParty: function (req, res) {
        var results = db.query(`SELECT * FROM candidates c LEFT JOIN parties p ON c.party_id = p.party_id WHERE p.partyName = "?" ORDER BY c.lName`, [req.params.party], function (err, results) {
            if (err) {
                console.log(err)
            }

            res.json(results);
        } // end query callback 
        ) // end db.query
    } // end getCandidatesByParty

    }; // End class

    module.exports = candidateController;