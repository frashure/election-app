var mainText = document.getElementById('main-content');

var resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";
mainText.appendChild(resultsContainer);



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
  }

function search() {

    // Remove any existing results container children
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    // Capture party value from selector
    var partySelection = document.getElementById("party-selector").value;
    console.log("Party: ",partySelection);

    var listUrl = "";

    if (partySelection == "All") {
        console.log(partySelection);
        listUrl = "http://localhost:3000/candidates";
        console.log(listUrl);
    }  
    else {
        console.log(partySelection);
        listUrl = "http://localhost:3000/candidates/party/"+partySelection;
        console.log(listUrl);
    }


    console.log("Retreiving information from database...");

    var requestCandidates = new XMLHttpRequest();

    requestCandidates.open('GET', listUrl);
    requestCandidates.responseType = 'json';
    requestCandidates.onload = function() {

        if (requestCandidates.status >= 200 && requestCandidates.status < 400) {
            console.log(requestCandidates.status);
        } else {
            console.log('ERROR: STATUS ' + requestCandidates.status);
        }
        var resultset = this.response;
        console.log("Onload");

        resultset.forEach(candidate => {
            var card = document.createElement("div");
            card.id = candidate.candidate_id;
            card.setAttribute("data-election_id", candidate.election_id);
            card.className = "candidate-card " + candidate.name + "-card";
            var cardHeader = document.createTextNode(candidate.firstName + " " + candidate.lastName);
            cardHeader.className = "card-header";
            var cardText = document.createTextNode("Party: " + candidate.name);
            cardText.className = "card-text";
            card.appendChild(cardHeader);
            var lineBreak = document.createElement("br");
            card.appendChild(lineBreak);
            card.appendChild(cardText);
            var endorseBtn = document.createElement("a");
            endorseBtn.className = "endorseBtn";
            endorseBtn.innerHTML = "Endorse";
            card.appendChild(endorseBtn);
            resultsContainer.appendChild(card);
    
            endorseBtn.addEventListener('click', endorseOnClick);
            console.log("Event listener added to endorseBtn."); 
            console.log(candidate.election_id);
            console.log(card.getAttribute("data-election_id"));

            // compare candidate to list of endorsed candidates by user,
            // if candidate in that result set, change endorsement button class
            // ..... do that here
        });


    } // end onload
    requestCandidates.send();




  } // end search function