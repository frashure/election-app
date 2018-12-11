var mainText = document.getElementById('main-content');
var userName = document.getElementById('user-name');
var profile = document.getElementById('user-info');
var endorsedList = [];

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

  buildProfile();
  buildEndorsements();
  getBallot();
} // end retrieveEndorsements;  


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


function removeEndorsement() {
  // add http request to remove endorsement from DB
  let candidate_id = this.parentElement.id;
  let election_id = this.parentElement.getAttribute("data-election_id");
  let payload = "candidate_id="+candidate_id+"&election_id="+election_id;
  let request = new XMLHttpRequest();
  request.open('DELETE', "http://localhost:3000/endorsements/users");
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.responseType = 'json';
  request.onload = () => {
    console.log(this);
    this.parentElement.remove();
    console.log('Endorsement removed!');
    console.log(request.response);
    console.log(request);
  }
  request.send(payload);
}


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

  var endorsements = document.createElement('div');


  var endorsementsHeader = document.createElement('h2');
  endorsementsHeader.className = 'endorsement-header';
  endorsementsHeader.innerHTML = "Your endorsements:";
  endorsements.appendChild(endorsementsHeader);
  mainText.appendChild(endorsements);

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
      endorsements.appendChild(noEndorsements);
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
        var endorseBtn = document.createElement('a');
        endorseBtn.className = "endorseBtnClicked";
        endorseBtn.innerHTML = "Unendorse";
        card.appendChild(endorseBtn);
        endorsements.appendChild(card);

        endorseBtn.addEventListener('click', checkClick);
      });
    }
  };
  requestEndorsements.send();
}

function getBallot() {

  var ballot = document.createElement('div');

  var ballotHeader = document.createElement('h2');
  ballotHeader.className = 'ballot-header';
  ballotHeader.innerHTML = "Your ballot:";
  ballot.appendChild(ballotHeader);
  mainText.appendChild(ballot);

  let request = new XMLHttpRequest();
  request.open('GET', "http://localhost:3000/user/ballot");
  request.responseType = 'json';
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.status);
    }
    else {
      console.log('ERROR: STATUS ' + request.status);
    }
    var resultSet = request.response;
    if (resultSet.length == 0) {
      var noEndorsements = document.createElement('div');
      noEndorsements.innerHTML = "There are no candidates running.";
      ballot.appendChild(noEndorsements);
    }
    else {
      resultSet.forEach(candidate => {
        var card = document.createElement("div");
        card.id = candidate.candidate_id;
        card.setAttribute("data-election_id", candidate.election_id);
        card.className = "candidate-card " + candidate.party_name + "-card";

        if (candidate.district == null) {
          var office = document.createTextNode(candidate.legis_name);
        }
        else {
          var office = document.createTextNode(candidate.legis_name + " " + candidate.district);
        }
        card.appendChild(office);
        let break1 = document.createElement('br');
        card.appendChild(break1);
        var cardHeader = document.createTextNode(candidate.firstName + " " + candidate.lastName);
        cardHeader.className = "card-header";
        var cardText = document.createTextNode("Party: " + candidate.party_name);
        cardText.className = "card-text";
        let break2 = document.createElement('br');
        card.appendChild(break2);
        card.appendChild(cardHeader);
        let break3 = document.createElement('br');
        card.appendChild(break3);
        card.appendChild(cardText);
        var endorseBtn = document.createElement('a');
        endorseBtn.className = "endorseBtn";
        endorseBtn.innerHTML = "Endorse";
        card.appendChild(endorseBtn);
        ballot.appendChild(card);

        if (endorsedList.some(c => c.candidate_id === candidate.candidate_id)) {
          endorseBtn.className = "endorseBtnClicked";
          endorseBtn.innerHTML = "Endorsed";
      }

        endorseBtn.addEventListener('click', checkClick);
      });
    }
  };
  request.send();
}

function checkClick() {
  if (this.className == "endorseBtn") {
    console.log(this.className);
    console.log(this.parentElement);
    endorseOnClick();
  }
  if (this.className == "endorseBtnClicked") {
    console.log(this.className);
    removeEndorsement();
  }
};

window.addEventListener('load', buildProfile());
window.addEventListener('load', retrieveEndorsements());
// window.addEventListener('load', buildEndorsements());
// window.addEventListener('load', getBallot());