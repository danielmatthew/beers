(function() {
	'use strict';

	var THUMBNAIL_SRC = 'assets/img/thumb.png';

	// Stores offset for pagination
	var paginationOffset = 10;

	window.addEventListener('load', windowLoadHandler, false);

	function windowLoadHandler() {
		loadBeers();
		addEventListeners();
	}

	// Keeps all our listeners together
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

	// Gets beers from database
	function loadBeers() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var response = JSON.parse(xhr.responseText);
					console.log("Sucessfully added " + response);
					var loading = document.getElementById('loading');
					removeElement(loading);
					drawList(response);	
				} 
				else {
					console.log("Request was unsuccessful: " + xhr.status);
				} 		
			}
		}
		xhr.open("get", "loadBeers.php", true);
		xhr.send(null);
	}

	// Define template for list item
	function drawItem(content) {
		var thumbnail,
			name,
			drunk,
			li = null

		var fragment = document.createDocumentFragment();

		for (var i = content.length - 1; i >= 0; i--) {
			// Create thumbnail
			thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', THUMBNAIL_SRC);
			thumbnail.setAttribute('width', '48px');
			thumbnail.setAttribute('height', '48px');

			// Create beer name
			name = document.createElement('h1');
			name.appendChild(document.createTextNode(content[i].name));

			// Date drunk
			drunk = document.createElement('span');
			drunk.appendChild(document.createTextNode(content[i].date_drunk));

			// Create list item
			li = document.createElement('li');
			li.appendChild(thumbnail);
			li.appendChild(name);
			li.appendChild(drunk);

			fragment.appendChild(li);			
		}

		return fragment;
	}

	// Draws list on page load
	function drawList(content) {
		var fragment = drawItem(content);
		document.getElementById("beers").appendChild(fragment);
	}

	// Draws new item at top of list
	function drawListItem(content) {
		var fragment = drawItem(content);
		document.getElementById("beers").insertBefore(fragment, beers.firstChild);
	}

	// Draws five more items at bottom of list
	function drawPaginationItems(content) {
		var fragment = drawItem(content);
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
		xhr.open("get", "pagination.php?offset=" + paginationOffset, true);
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

	// Clears specified text input on submission
	function clearTextInput(textInputName) {
		var input = document.getElementById(textInputName);
		input.value = '';
	}

	// Useful function to remove specified element - suppose could just set innerHtml to ''...
	function removeElement(el) {
		el.parentNode.removeChild(el);
	}
})();
