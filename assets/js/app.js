(function() {

	// Stores offset for pagination
	var paginationOffset = 10;

	window.addEventListener('load', windowLoadHandler, false);

	function windowLoadHandler() {
		addEventListeners();
	}

	function addEventListeners() {
		document.getElementById("add").addEventListener('click', addBeer, false);
		document.getElementById("paginate").addEventListener('click', paginate, false);		
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
					drawListItem(response);
					//createListItem(response);
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



// Draws number of list items with specified content
function drawText(content, num) {
	var beers = document.getElementById("beers");
	var fragment = document.createDocumentFragment();
	var li = null;
	if (content.length < 5) {
		//TODO: 'disable' pagination button
	}
	else {
		for (var i = 0; i < content.length; i++) {	
			li = document.createElement("li");
			var t = document.createTextNode();
			t.data = content[i].name;
			li.appendChild(t);
			li.classList.add('fade');
			beers.insertBefore(li, beers.lastChild);		
		}
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

	// Draws new item at top of list
	function drawListItem(content) {
		var thumbnail = null;
		var name = null;

		var fragment = document.createDocumentFragment();

		//Create thumbnail
		thumbnail = document.createElement('img');
		thumbnail.setAttribute('src', 'assets/img/thumb.png');


		//Create beer name
		name = document.createElement('h1');
		name.appendChild(document.createTextNode(content));


		//Create list item
		li = document.createElement('li');
		li.className = 'fade';
		li.appendChild(thumbnail);
		li.appendChild(name);
		fragment.appendChild(li);

		//Add to top of list
		//document.getElementById("beers").appendChild(fragment);
		document.getElementById("beers").insertBefore(fragment, beers.firstChild);
	}

	// Draws five more items at bottom of list
	function drawPaginationItems(content, num) {
		var thumbnail = null;
		var name = null;

		var fragment = document.createDocumentFragment();

		for (var i = 0; i < content.length; i++) {
			//Create thumbnail
			thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', 'assets/img/thumb.png');


			//Create beer name
			name = document.createElement('h1');
			name.appendChild(document.createTextNode(content[i].name));


			//Create list item
			li = document.createElement('li');
			li.className = 'fade';
			li.appendChild(thumbnail);
			li.appendChild(name);
			fragment.appendChild(li);
		}

		//Add to bottom of list
		document.getElementById("beers").appendChild(fragment);		
	}

	// Renders pagination results
	function paginate() {
		if (event.preventDefault) {
			event.preventDefault();
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					console.log(xhr.responseText);
					var response = JSON.parse(xhr.responseText);
					drawPaginationItems(response, 5);
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

// Renders error message for user
function drawErrorMessage(msg) {
	var errorMessage = document.getElementById("errorMessage");
	var t = document.createTextNode();

	t.data = msg;
	errorMessage.appendChild(t);
	errorMessage.classList.add(slideIn);
}

//Uses Geolocation API to access location
function getUserLocation() {
	navigator.geolocation.getCurrentPosition(printCoords);
}


//Aptly named callback function for getUserLocation
function printCoords(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log(latitude, longitude);
}


// Clears specified text input on submission
function clearTextInput(textInputName) {
	var input = document.getElementById(textInputName);
	input.value = '';
}
})();
