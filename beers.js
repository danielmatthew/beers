function init() {
	renderMarkUp();
}

var add = document.getElementById("add");
add.addEventListener('click', addBeer, false);
window.addEventListener("DOMContentLoaded", init, false);

function addBeer(){
	if (event.preventDefault) {
		event.preventDefault();
	}
	if (document.getElementById("beerName").value) {
		var timestamp = new Date().getTime();
		var beer = document.getElementById("beerName").value;
		localStorage.setItem(timestamp, beer);		
	}
}

function renderMarkUp() {
	for (var i in localStorage) {
		console.log(localStorage.getItem(i));
		var beers = document.getElementById("beers");
		var li = document.createElement("li");
		var t = document.createTextNode();
		t.data = localStorage.getItem(i);
		li.appendChild(t);
		beers.appendChild(li);
	}
}