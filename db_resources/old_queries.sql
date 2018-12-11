-- old query for userController.getBallot()
SELECT o.office_id, o.legislature_id, c.firstName, c.lastName, p.name AS party_name, l.name AS legis_name, o.district, e.type, e.date, ec.candidate_id, ec.isIncumbent
        FROM
            user_ballot ub LEFT JOIN offices o
                ON ub.office_id = o.office_id
            LEFT JOIN elections e
                ON o.office_id = e.office_id
            LEFT JOIN election_candidates ec
                ON e.election_id = ec.election_id
            LEFT JOIN legislatures l
                ON o.legislature_id = l.legislature_id
            LEFT JOIN candidates c
                ON ec.candidate_id = c. candidate_id
            LEFT JOIN parties p
                on c.party_id = p.party_id
        WHERE ub.voter_id = ?;

        