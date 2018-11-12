const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const db = require('../models/dbconnection');

var partyController = {

    getParties: (req, res) => {
        var results = db.query('SELECT * FROM parties', (err, results) => {
            if (err) {
              console.log(err);
              res.send(err);
            }
            else {
              res.json(results);
            }
          });
    }, //end getParties

    getPartyById: (req, res) => {
        var results = db.query(`SELECT * FROM parties WHERE party_id = ?`, [req.params.party_id], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        })
    }, // end getPartyById

    getPartyByName: (req, res) => {
        var results = db.query(`SELECT * FROM parties WHERE partyName = ?`, [req.params.party_name], (err, results) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(results);
            }
        });
    } // end getPartyByName
}; // end controller class

module.exports = partyController;