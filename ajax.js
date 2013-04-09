(function() {
var add = document.getElementById("add");
add.addEventListener('click', addBeer, false);
var five = document.getElementById("add-five");
five.addEventListener('click', drawList, false);



// Stores offset for pagination
// var offset = sessionStorage.setItem('offset', 5);
var paginationOffset = 10;

// Generic AJAX function
function xmlHttp(successFunction, failureFunction) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var response = JSON.parse(xhr.responseText);
				successFunction(response);
			}
			else {
				failureFunction();
			}
		}
	}
}


// Adds new beer listing to database
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

// Renders pagination results
function drawList() {


	if (event.preventDefault) {
		event.preventDefault();
	}

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
	xhr.open("get", "test.php?offset=" + paginationOffset, true);
	paginationOffset += 5;
	xhr.send(null);
}

// Draws number of list items with specified content
function drawText(content, num) {
	var beers = document.getElementById("beers");
	var fragment = document.createDocumentFragment();
	var li = null;

	for (var i = 0; i < content.length; i++) {	
		li = document.createElement("li");
		var t = document.createTextNode();
		t.data = content[i].name;
		li.appendChild(t);
		li.classList.add('fade');
		beers.insertBefore(li, beers.lastChild);		
	}
	// Rewrite insertion using fragment
	//
	// for (var i = 0; i < content.length; i++) {
	// 	li = document.createElement("li");
	// 	li.appendChild(document.createTextNode())
	// 	fragment.appendChild(li);
	// }

	// beers.appendChild(fragment);
}

// Adds new item to top of list
function createListItem(content) {
	var beers = document.getElementById("beers");
	var li = document.createElement("li");
	var t = document.createTextNode();
	t.data = content;
	li.appendChild(t);
	li.classList.add('fade');
	beers.insertBefore(li, beers.firstChild);
}

// Renders error message for user
function drawErrorMessage() {
	//TODO
}

// Clears specified text input on submission
function clearTextInput(textInputName) {
	var input = document.getElementById(textInputName);
	input.value = '';
}
})();
