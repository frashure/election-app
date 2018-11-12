const db = require('../models/dbconnection.js');

var endorsementsController = {

    getEndorsements: (req, res) => {
        var results = db.query('SELECT * FROM endorsements', (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    }, // end getEndorsements

    getEndorsementByCandidate: (req, res) => {
        var results = db.query(`SELECT * FROM endorsements WHERE candidate_id = ?`, [req.params.id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getEndorsementsByCandidate

    getEndorsementsByUser: (req, res) => {
        var results = db.query(`SELECT * FROM endorsements WHERE voter_id = ?`, [req.params.id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getEndorsementsByUser

    postEndorsement: (req, res) => {
        let date = new Date();
        var results = db.query(`INSERT INTO endorsements (voter_id, candidate_id, dateEndorsed) VALUES (?, ?, ?)`,[req.body.voter_id, req.body.candidate_id, date], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getEndorsementsByCandidate

    deleteEndorsement: (req, res) => {
        var results = db.query(`DELETE FROM endorsements WHERE voter_id = ? AND candidate_id = ?`, [req.body.voter_id, req.body.candidate_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }

} // end controller class

module.exports = endorsementsController;