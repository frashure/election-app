var db = require('../models/dbconnection');

// Create candidatesController class
var candidateController = {

    // Get all candidates
    getAllCandidates: function (req, res) {
        var results = db.query('SELECT * FROM candidates', function (err, results) {
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
    }, // End getAllCandidates

    getCandidatesById: function(req, res) {
        var results = db.query(`SELECT * FROM candidates WHERE candidate_id = ${req.params.id}`, function (err, results) {
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
        var results = db.query(`SELECT * FROM candidates WHERE party_id = ${req.params.party}`, function (err, results) {
            if (err) {
                console.log(err)
            }

            // Create results
            var resultsJson = JSON.stringify(results);
            resultsJson = JSON.parse(resultsJson);
            var apiResult = {};

            apiResult.data = resultsJson;

            res.json(apiResult);
        } // end callback 
        ) // end db.query
    } // end getCandidatesByParty

    }; // End class

    module.exports = candidateController;