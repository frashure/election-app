var mainText = document.getElementById('main-content');
var userName = document.getElementById('user-name');
var profile = document.getElementById('user-info');


function buildProfile() {
  var reqProf = new XMLHttpRequest():
  reqProf.open('GET', http://localhost:3000/users/getUser)
}

function buildEndorsements() {
  var requestEndorsements = new XMLHttpRequest();
  requestEndorsements.open('GET', "http://localhost:3000/endorsements/users");
  requestEndorsements.responseType = 'json';
  requestEndorsements.onload = () => {
    if (requestEndorsements.status >= 200 && requestEndorsements.status < 400) {
      console.log(requestEndorsements.status);
    }
    else {
      console.log('ERROR: STATUS ' + requestEndorsements.status);
    }
    var resultset = requestEndorsements.response;
    var welcomeMessage = document.getElementById('user-info');
    welcomeMessage.innerHTML = "You have successfully logged in. Your endorsed candidates:";
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
            mainText.appendChild(card);
    })
  };
  requestEndorsements.send();
}

window.onload = buildEndorsements();