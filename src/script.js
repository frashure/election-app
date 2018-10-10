var mainText = document.getElementById('main-content');

var homeLink = document.getElementById('home-link');
var aboutLink = document.getElementById('about-link');
var searchLink = document.getElementById('search-link');

homeLink.onclick = function() {
mainText.innerHTML = "Welcome to the Election Application!";
};

aboutLink.onclick = function() {
mainText.innerHTML = "The Election Application is an interactive application that allows voters to educate themselves on all candidates that will be on their ballot, endorse candidates, and see which candidates their friends are supporting. The full website, along with iOS and Android mobile applications, are anticipated to be completed sometime in March 2019 - just in time for the 2020 presidential election season.";
};

searchLink.onclick = function() {
mainText.innerHTML = "What candidate would you like to search for?";
};
