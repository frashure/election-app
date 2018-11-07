const db = require('../controllers/endorsementsController.js');

var endorsementsController = {

    getEndorsements: (req, res) => {
        var results = db.query('SELECT * FROM endorsements', function (err, results) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(reults);
        });
    }, // end getEndorsements

    getEndorsementByCandidate: (req, res) => {
        var results = deb.query(`SELECT * FROM endorsements WHERE candidate_id = ${req.body.candidate_id}`, (err, results) => {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json(results);
        })
    }

} // end controller class

module.exports = endorsementsController;