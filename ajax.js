var add = document.getElementById("add");
add.addEventListener('click', addBeer, false);

function addBeer() {
	if (event.preventDefault) {
		event.preventDefault();
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var response = JSON.parse(xhr.responseText);
				console.log(response);
				createListItem(response);
				clearTextInput("beerName");
			} 
			else {
				console.log("Request was unsuccessful: " + xhr.status);
				//Write code to draw error message on page
			} 		
		}
	}
	xhr.open("post", "beer.php", true);
	var form = document.getElementById("addBeer");
	xhr.send(new FormData(form));	
}

function createListItem(content) {
	var beers = document.getElementById("beers");
	var li = document.createElement("li");
	var t = document.createTextNode();
	t.data = content;
	li.appendChild(t);
	li.classList.add('fade');
	beers.insertBefore(li, beers.firstChild);
}

function clearTextInput(textInputName) {
	var input = document.getElementById(textInputName);
	input.value = '';
}