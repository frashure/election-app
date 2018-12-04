var db = require('../models/dbconnection');

// Create candidatesController class
var candidateController = {

    // Get all candidates
    getAllCandidates: (req, res) => {
        var results = db.query(`SELECT * FROM candidates c 
        LEFT JOIN election_candidates ec
        ON c.candidate_id = ec.candidate_id
        LEFT JOIN parties p ON c.party_id = p.party_id
        ORDER BY c.lastName`, (err, results) => {
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
        var results = db.query(`SELECT * FROM
            candidates c
            LEFT JOIN election_candidates ec
            ON ec.candidate_id = c.candidate_id
            LEFT JOIN parties p
            ON c.party_id = p.party_id
            WHERE p.name = ?
            ORDER BY c.lastName`,
            [req.params.party], (err, results) => {
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