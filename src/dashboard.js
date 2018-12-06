var mainText = document.getElementById('main-content');
var userName = document.getElementById('user-name');
var profile = document.getElementById('user-info');


function buildProfile() {
  var reqProf = new XMLHttpRequest();
  reqProf.open('GET', "http://localhost:3000/user");
  reqProf.responseType = 'json';
  reqProf.onload = () => {
    if (reqProf.status >= 200 && reqProf.status <400) {
      console.log(reqProf.response);
      let resultSet = reqProf.response;
      var firstName = resultSet[0].firstName;
      var lastName = resultSet[0].lastName;
      var party = resultSet[0].party_id;

      profile.innerHTML = "Name: " + firstName + " " + lastName;
    }
    else {
      console.log('ERROR: STATUS ' + reqProf.status);
      console.log(reqProf.response);
    }
  };
  reqProf.send();

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
    var resultSet = requestEndorsements.response;
    if (resultSet.length == 0) {
      var noEndorsements = document.createElement('div');
      noEndorsements.innerHTML = "You have not endorsed any candidates.";
      mainText.appendChild(noEndorsements);
    }
    else {
      resultSet.forEach(candidate => {
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
      });
    }
  };
  requestEndorsements.send();
}

// window.onload = buildEndorsements();
// window.onload = buildProfile();

window.addEventListener('load', buildProfile());
window.addEventListener('load', buildEndorsements());