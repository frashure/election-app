var db = require('../models/dbconnection');

// Create candidatesController class
var candidateController = {

    // Get all candidates
    getAllCandidates: (req, res) => {
        var results = db.query(`SELECT * FROM candidates c LEFT JOIN parties p ON c.party_id = p.party_id ORDER BY c.lName`, (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
          } // End callback
        ); // End db.query
    }, // End getAllCandidates

    getCandidatesById: (req, res) => {
        var results = db.query(`SELECT * FROM candidates WHERE candidate_id = ?`, [req.params.id], (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
          } // End callback
        ); // End db.query
    }, // End getCandidatesById

    getCandidatesByParty: (req, res) => {
        var results = db.query(`SELECT * FROM candidates c LEFT JOIN parties p ON c.party_id = p.party_id WHERE partyName = ? ORDER BY c.lName`, [req.params.party], (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
        } // end query callback 
        ) // end db.query
    } // end getCandidatesByParty

    }; // End class

    module.exports = candidateController;