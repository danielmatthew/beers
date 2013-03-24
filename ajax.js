var add = document.getElementById("add");
add.addEventListener('click', addBeer, false);
var five = document.getElementById("add-five");
five.addEventListener('click', drawList, false);

function addBeer() {
	if (event.preventDefault) {
		event.preventDefault();
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var response = JSON.parse(xhr.responseText);
				console.log("Sucessfully added " + response);
				createListItem(response);
				clearTextInput("beerName");
			} 
			else {
				console.log("Request was unsuccessful: " + xhr.status);
				//TODO: Draw error message on page
			} 		
		}
	}
	xhr.open("post", "beer.php", true);
	var form = document.getElementById("addBeer");
	xhr.send(new FormData(form));	
}

function drawList() {
	if (event.preventDefault) {
		event.preventDefault();
	}
	var text = "hello"	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				console.log(xhr.responseText);
				var response = JSON.parse(xhr.responseText);
				drawText(response, 5);
			}
			else {
				console.log("drawList went wrong: " + xhr.status);
			}
		}
	}
	xhr.open("get", "test.php", true);
	xhr.send(null);
}

function drawText(content, num) {
	var beers = document.getElementById("beers");
	for (var i = 0; i < content.length; i++) {	
		var li = document.createElement("li");
		var t = document.createTextNode();
		t.data = content[i].name;
		li.appendChild(t);
		li.classList.add('fade');
		beers.insertBefore(li, beers.lastChild);		
	}
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