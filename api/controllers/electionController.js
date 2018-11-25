const db = require('../models/dbconnection');

var electionsController = {

    //GET all elections
    getElections: (req, res) => {
        var results = db.query(`SELECT * FROM elections`, (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    },
    
    getElectionByID: (req, res) => {
        var results = db.query(`SELECT * FROM elections WHERE election_id = ?`, [req.body.election_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    }, // end getElections

    getElectionsByOffice: (req, res) => {
        var results = db.query(`SELECT * FROM elections WHERE office_id = ?`, [req.body.office_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getElectionByOffice

    getCandidatesByElection: (req, res) => {
        var results = db.query(`SELECT * FROM election_candidates WHERE election_id = ?`, [req.body.election_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    },

    getCandidatesByOffice: (req, res) => {
        var results = db.query(`SELECT * FROM elections e LEFT JOIN election_candidates ec on e.election_id = ec.election_id WHERE e.office_id = ?`, [req.body.office_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getCandidatesByOffice

    getElectionsByState: (req, res) => {
        var results = db.query(`SELECT * FROM elections e LEFT JOIN offices o ON e.office_id = o.office_id LEFT JOIN legislatures l ON o.legislature_id = o.legislature_id WHERE o.state = ? OR l.state = ?`, [req.body.state, req.body.state], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }
}; // end controller object

module.exports = electionsController;