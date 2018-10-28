var mainText = document.getElementById('main-content');

var resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";
mainText.appendChild(resultsContainer);

var url = "";

var endorseOnClick = function() {
    if (this.className == "endorseBtn") {
    this.className = "endorseBtnClicked";
    this.innerHTML = "Endorsed";
    console.log("Candidate endorsed!")
    }
    else {
      this.className = "endorseBtn";
      this.innerHTML = "Endorse";
      console.log("Candidate endorsement removed!")
    }
  }

function search() {

    // Remove any existing results container children
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    // Capture party value from selector
    var partySelection = document.getElementById("party-selector").value;
    console.log("Party: ",partySelection);

    if (partySelection == "All") {
        console.log(partySelection);
        url = "http://localhost:3000/candidates";
        console.log(url);
    }  
    else {
        console.log(partySelection);
        url = "http://localhost:3000/candidates/party="+partySelection;
        console.log(url);
    }


    console.log("Retreiving information from database...");

    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.responseType = 'json';
    request.onload = function() {

        if (request.status >= 200 && request.status < 400) {
            console.log(request.status);
        } else {
            console.log('ERROR: STATUS ' + request.status);
        }
        var resultset = this.response;
        console.log("Onload");

        resultset.forEach(candidate => {
            var card = document.createElement("div");
            card.className = "candidate-card " + candidate.partyName + "-card";
            var cardHeader = document.createTextNode(candidate.fName + " " + candidate.lName);
            cardHeader.className = "card-header";
            var cardText = document.createTextNode("Party: " + candidate.partyName);
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
        });

    }
    request.send();

  }