var mainText = document.getElementById('main-content');

var aboutLink = document.getElementById('about-link');

aboutLink.onclick = function() {
mainText.innerHTML = "The Election Application is an interactive application that allows voters to educate themselves on all candidates that will be on their ballot, endorse candidates, and see which candidates their friends are supporting. The full website, along with iOS and Android mobile applications, are anticipated to be completed sometime in March 2019 - just in time for the 2020 presidential election season.";
};

function Candidate(fName, lName, party, office, endorsed) {
  this.fName = fName;
  this.lName = lName;
  this.party = party;
  this.office = office;
  this.endorsed = endorsed;
}

var candidates = [
  new Candidate("Gary", "Johnson", "Libertarian", "President", false),
  new Candidate("Donald", "Trump", "Republican", "President", false),
  new Candidate("Hillary", "Clinton", "Democratic", "President", false)
];

window.onload = function() {
  for (i = 0; i < candidates.length; i++) {
    var card = document.createElement("div");
    card.className = "candidate-card " + candidates[i].party + "-card";
    var cardHeader = document.createTextNode(candidates[i].fName + " " + candidates[i].lName);
    cardHeader.className = "card-header";
    var cardText = document.createTextNode("Party: " + candidates[i].party);
    cardText.className = "card-text";
    card.appendChild(cardHeader);
    var lineBreak = document.createElement("br");
    card.appendChild(lineBreak);
    card.appendChild(cardText);
    mainText.appendChild(card);
    console.log("Function run.")
  }
}
