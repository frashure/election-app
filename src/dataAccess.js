var mainText = document.getElementById('main-content');

var resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";
mainText.appendChild(resultsContainer);


var endorsedList;
var isLoggedIn;


function endorseOnClick() {

    var requestEndorsements = new XMLHttpRequest();
    var endorseUrl = "http://localhost:3000/endorsements/users";
    var method = "";
    var candidate_id = this.parentElement.id;
    var election_id = this.parentElement.getAttribute("data-election_id");

    if (this.className == "endorseBtn") {
      method = "POST";
      this.className = "endorseBtnClicked";
      this.innerHTML = "Endorsed";
      console.log("Candidate endorsed!");
    }
    else {
      method = "DELETE";
      this.className = "endorseBtn";
      this.innerHTML = "Endorse";
      console.log("Candidate endorsement removed!");
    }

    requestEndorsements.open(method, endorseUrl);
    requestEndorsements.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    requestEndorsements.responseType = 'json';
    var payload = "candidate_id="+candidate_id+"&election_id="+election_id;
    requestEndorsements.send(payload);
    console.log("Candidate id = " + candidate_id + " Election id = " + election_id);
    console.log(requestEndorsements.response);
}; // end endorseOnClick


function retrieveEndorsements() {

    var requestEndorsementList = new XMLHttpRequest();
    requestEndorsementList.open('GET', "http://localhost:3000/endorsements/users");
    requestEndorsementList.responseType = 'json';
    requestEndorsementList.onload = () => {
        if (requestEndorsementList.status == 401) {
            endorsedList = [];
            isLoggedIn = false;
            console.log(isLoggedIn);
        }
        else {
            endorsedList = requestEndorsementList.response;
            isLoggedIn = true;
        }
    }
    requestEndorsementList.send();

    buildCandidateList();
} // end retrieveEndorsements;  


function buildCandidateList() {

    // Remove any existing results container children
    while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
}

    // Capture election, party values from selector
    var electionSelection = document.getElementById("election-selector").value;
    var partySelection = document.getElementById("party-selector").value;

    var listUrl = "";

    if (partySelection == "All" && electionSelection == "All") {
        listUrl = "http://localhost:3000/candidates";
    }  
    else if (electionSelection == "All" && !(partySelection == "All")) {
        console.log('Searching by party ID: ' + partySelection);
        listUrl = "http://localhost:3000/candidates/party/"+partySelection;
        console.log(listUrl);
    }
    else if (partySelection == "All" && !(electionSelection == "All")) {
        console.log('Searching by election ID: ' + electionSelection);
        listUrl = "http://localhost:3000/candidates/election/"+electionSelection
    }
    else if (!(partySelection == "All") && !(electionSelection == "All")) {
        console.log('Searching by election ID: ' + electionSelection + 'and party: ' + partySelection);
        listUrl = "http://localhost:3000/candidates/election/"+electionSelection+"/party/"+partySelection;
    }


    var requestCandidates = new XMLHttpRequest();

    requestCandidates.open('GET', listUrl);
    requestCandidates.responseType = 'json';
    requestCandidates.onload = () => {

        if (requestCandidates.status >= 200 && requestCandidates.status < 400) {
            console.log('requestCandidates status: ' + requestCandidates.status);
        } else {
            console.log('ERROR: STATUS ' + requestCandidates.status);
            res.status(500).send();
        }
        var resultset = requestCandidates.response;
        console.log(requestCandidates.response);

        resultset.forEach(candidate => {
            var card = document.createElement("div");
            card.id = candidate.candidate_id;
            card.setAttribute("data-election_id", candidate.election_id);
            card.className = "candidate-card " + candidate.party_name + "-card";
            var cardHeader = document.createTextNode(candidate.firstName + " " + candidate.lastName);
            cardHeader.className = "card-header";
            var cardText = document.createTextNode("Party: " + candidate.party_name);
            cardText.className = "card-text";
            card.appendChild(cardHeader);
            var lineBreak = document.createElement("br");
            card.appendChild(lineBreak);
            card.appendChild(cardText);

            if (isLoggedIn) {
                var endorseBtn = document.createElement("a");
                endorseBtn.className = "endorseBtn";
                endorseBtn.innerHTML = "Endorse";
                card.appendChild(endorseBtn);
                endorseBtn.addEventListener('click', endorseOnClick);
            }

            resultsContainer.appendChild(card);

            // compare candidate to list of endorsed candidates by user,
            // if candidate in that result set, change endorsement button class
            if (endorsedList.some(c => c.candidate_id === candidate.candidate_id)) {
                endorseBtn.className = "endorseBtnClicked";
                endorseBtn.innerHTML = "Endorsed";
            }
            
        });
} // end onload
requestCandidates.send();
} // end buildCandidateList 

function search() {

    retrieveEndorsements();

  } // end search function