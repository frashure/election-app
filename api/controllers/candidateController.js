var db = require('../models/dbconnection');

// Create candidatesController class
var candidateController = {

    // Get all candidates
    getAllCandidates: (req, res) => {
        var results = db.query(`SELECT c.*, p.name AS party_name, p.*, ec.election_id FROM candidates c 
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
        var results = db.query(`SELECT c.*, p.name AS party_name, p.party_id FROM
            candidates c
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
    }, // end getCandidatesByParty

    getCandidatesByElection: (req, res) => {
        var results = db.query(`SELECT c.*, p.name AS party_name, p.*, ec.election_id
        FROM candidates c
            LEFT JOIN parties p
                ON c.party_id = p.party_id
            LEFT JOIN election_candidates ec
                on c.candidate_id = ec.candidate_id
        WHERE c.candidate_id IN (
            SELECT candidate_id
            FROM election_candidates ec
                LEFT JOIN elections e
                    ON ec.election_id = e.election_id
                LEFT JOIN offices o
                    ON e.office_id = o.office_id
                LEFT JOIN legislatures l
                    ON o.legislature_id = l.legislature_id
            WHERE l.legislature_id = ?)
            ORDER BY c.lastName`,
            [req.params.legislature_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    }, // end getCandidatesByElection

    getCandidatesByElectionParty: (req, res) => {
        var results = db.query(`SELECT c.*, p.name AS party_name, p.*, ec.election_id
        FROM candidates c
            LEFT JOIN parties p
                ON c.party_id = p.party_id
            LEFT JOIN election_candidates ec
                on c.candidate_id = ec.candidate_id
        WHERE c.candidate_id IN (
            SELECT candidate_id
            FROM election_candidates ec
                LEFT JOIN elections e
                    ON ec.election_id = e.election_id
                LEFT JOIN offices o
                    ON e.office_id = o.office_id
                LEFT JOIN legislatures l
                    ON o.legislature_id = l.legislature_id
            WHERE l.legislature_id = ?
                AND p.name = ?)
            ORDER BY c.lastName`, [req.params.legislature_id, req.params.party_name], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    } // end getCandidatesByElectionParty
    }; // End class

    module.exports = candidateController;