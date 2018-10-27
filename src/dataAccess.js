var mainText = document.getElementById('main-content');

var resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";
mainText.appendChild(resultsContainer);

function getAllCandidates() {

    var partySelection = document.getElementById("party-selector").value;
    console.log("Party: ",partySelection);

    // Remove any existing results container children
    while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
    }

    console.log("Retreiving information from database...");

    var request = new XMLHttpRequest();

    // request.onreadystatechange = function() {
    //     console.log(this.readyState) // should be 4
    //     console.log(this.status) // should be 200 OK
    //     console.log(this.responseText) // response return from request
    // };
    request.open('GET', 'http://localhost:3000/candidates');
    request.responseType = 'json';
    request.onload = function() {

        if (request.status >= 200 && request.status < 400) {
            console.log(request.status);
          } else {
            console.log('ERROR: STATUS ' + request.status);
          }
        
        var data = this.response;
        console.log(data);
        console.log("Onload");

        response.forEach(candidate => {
            var card = document.createElement("div");
            card.className = "candidate-card " + candidate[i].partyName + "-card";
            var cardHeader = document.createTextNode(candidate[i].fName + " " + candidate[i].lName);
            cardHeader.className = "card-header";
            var cardText = document.createTextNode("Party: " + candidate[i].partyName);
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