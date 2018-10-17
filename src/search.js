var mainText = document.getElementById('main-content');

function Candidate(fName, lName, party, office, endorsed) {
  this.fName = fName;
  this.lName = lName;
  this.party = party;
  this.office = office;
  this.endorsed = endorsed;
}

var resultsContainer = document.createElement("div");
resultsContainer.className = "results-container";
mainText.appendChild(resultsContainer);

var candidates = [
  new Candidate("Gary", "Johnson", "Libertarian", "President", false),
  new Candidate("Donald", "Trump", "Republican", "President", false),
  new Candidate("Hillary", "Clinton", "Democratic", "President", false)
];

var searchCandidatesByParty = function() {
  while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
  }

  var partySelection = document.getElementById("party-selector").value;
      console.log(partySelection);

  for (i = 0; i < candidates.length; i++) {
   if (candidates[i].party == partySelection) {
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
      resultsContainer.appendChild(card);
   }
  }
  console.log("Search completed.")
}

// window.onload = function() {
//   var resultsContainer = document.createElement("div");
//   resultsContainer.className = "results-container";
//   mainText.appendChild(resultsContainer);
//   for (i = 0; i < candidates.length; i++) {
//     var card = document.createElement("div");
//     card.className = "candidate-card " + candidates[i].party + "-card";
//     var cardHeader = document.createTextNode(candidates[i].fName + " " + candidates[i].lName);
//     cardHeader.className = "card-header";
//     var cardText = document.createTextNode("Party: " + candidates[i].party);
//     cardText.className = "card-text";
//     card.appendChild(cardHeader);
//     var lineBreak = document.createElement("br");
//     card.appendChild(lineBreak);
//     card.appendChild(cardText);
//     resultsContainer.appendChild(card);
//     console.log("Function run.")
//   }
// }