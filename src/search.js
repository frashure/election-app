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
  new Candidate("John", "Delaney", "Democratic", "President", false),
  new Candidate("Donald", "Trump", "Republican", "President", false),
  new Candidate("Jeff", "Boss", "Democratic", "President", false),
  new Candidate("Ken", "Nwadike", "Democratic", "President", false),
  new Candidate("Robby", "Wells", "Democratic", "President", false),
  new Candidate("Andrew", "Yang", "Democratic", "President", false),
  new Candidate("Adam", "Kokesh", "Libertarian", "President", false),
  new Candidate("Vermin", "Supreme", "Libertarian", "President", false),
  new Candidate("Arvin", "Vohra", "Libertarian", "President", false)
];

function sortyByLastName(a,b) {
  if (a.lName < b.lName)
    return -1;
  if (a.lName > b.lName)
    return 1;
  return 0;
}

candidates.sort(sortyByLastName);

var searchCandidatesByParty = function() {
  while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
  }

  var partySelection = document.getElementById("party-selector").value;
      console.log("Party: ",partySelection);

  for (i = 0; i < candidates.length; i++) {
    if (partySelection == "All") {
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
      var endorseBtn = document.createElement("a");
      endorseBtn.className = "endorseBtn";
      endorseBtn.innerHTML = "Endorse";
      card.appendChild(endorseBtn);
      resultsContainer.appendChild(card);

      endorseBtn.addEventListener('click', endorseOnClick);
      console.log("Event listener added to endorseBtn.");
    }
   else if (candidates[i].party == partySelection) {
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
      var endorseBtn = document.createElement("a");
      endorseBtn.className = "endorseBtn";
      endorseBtn.innerHTML = "Endorse";
      card.appendChild(endorseBtn);
      resultsContainer.appendChild(card);

      endorseBtn.addEventListener('click', endorseOnClick);
      console.log("Event listener added to endorseBtn.");
   }
  }
  console.log("Search completed.")
}

var endorseBtn = document.getElementsByClassName("endorseBtn");
console.log(endorseBtn);
var setListeners = function() {
for (var i = 0; i < endorseBtn.length; i++) {
endorseBtn.addEventListener('click', endorseOnClick);
console.log("Event listener added to endorseBtn.");
  }
}

// var endorseOnClick = function() {
//   if (this.className == "endorseBtn") {
//   this.className = "endorseBtnClicked";
//   this.innerHTML = "Endorsed";
//   console.log("Candidate endorsed!")
//   }
//   else {
//     this.className = "endorseBtn";
//     this.innerHTML = "Endorse";
//     console.log("Candidate endorsement removed!")
//   }
// }
