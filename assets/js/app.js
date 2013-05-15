(function() {
	'use strict';

	var THUMBNAIL_SRC = 'assets/img/thumb.png';

	// Stores offset for pagination
	var paginationOffset = 10;

	window.addEventListener('load', windowLoadHandler, false);

	function windowLoadHandler() {
		doesSessionExist();
		addEventListeners();
	}

	// Checks if userId exists in PHP session
	// TODO: Refactor to use sessionStorage - can cut out request to server
	function doesSessionExist() {
		ajax('actions/check-session.php', function(content){
			if (content === 1) {
				buildUI();					
			}
			else {
				drawLoginForm();
			}
		});
	}

	// Adds our load time event listeners
	function addEventListeners() {
		
	}

	// Renders registration form
	function drawRegistrationForm() {
		// Hide login form
		removeElement(document.getElementById('login-div'));

		var headers = document.getElementsByTagName('header');
		var fragment = document.createElement('div');
		var template = document.getElementById('registerTpl').innerHTML;
		var html = Mustache.to_html(template);

		fragment.id = 'register-div';
		fragment.innerHTML = html;

		insertAfter(headers[0], fragment);	

		document.getElementById('register').classList.add('slideIn');
		document.getElementById('login-link').addEventListener('click', drawLoginForm, false);
		document.getElementById("register-btn").addEventListener('click', register, false);
	
	}

	// Renders login form
	function drawLoginForm() {
		// If registration form on page... hide it! 
		if (document.getElementById('register')) {
			removeElement(document.getElementById('register-div'));
		}

		var headers = document.getElementsByTagName('header');
		var fragment = document.createElement('div');
		var template = document.getElementById('loginTpl').innerHTML;
		var html = Mustache.to_html(template);

		fragment.id = 'login-div';
		fragment.innerHTML = html;

		insertAfter(headers[0], fragment);

		document.getElementById('login').classList.add('slideIn');
		document.getElementById('registration-link').addEventListener('click', drawRegistrationForm, false);
		document.getElementById("login-btn").addEventListener('click', login, false);

	}

	// DOM Helper to quickly add multiple attributes
	function addElementAttributes() {
		// Loop through argument array and add attribute for each
		for (var i = 0; i < Things.length; i++) {
			Things[i].setAttribute();
		}
	}

	// Renders add beer form
	function drawAddBeerForm() {
		var form,
			beerName,
			addBeer,
			add = null;

		var fragment = document.createDocumentFragment();
		var headers = document.getElementsByTagName('header');

		// Create form
		form = document.createElement('form');
		form.id = 'addBeer';
		form.className = 'row group';

		// Create input
		beerName = document.createElement('input');
		beerName.id = 'beerName';
		beerName.setAttribute('name', 'beerName');
		beerName.setAttribute('type', 'text');
		beerName.setAttribute('placeholder', 'What are you drinking?');

		// Create button
		add = document.createElement('button');
		add.id = 'add';
		add.setAttribute('type', 'submit');
		add.className = 'button';
		add.appendChild(document.createTextNode("+"));

		// Build it
		form.appendChild(beerName);
		form.appendChild(add);
		fragment.appendChild(form);

		insertAfter(headers[0], form);
	}


	// Builds UI on success 
	function login() {
		if (event.preventDefault) {
			event.preventDefault();
		}
		var login = document.getElementById('login');
		formDataAjax('actions/user_login.php', buildUI, login);
		removeElement(document.getElementById('login'));		
	}

	// Allows user to logout
	function logout() {
		ajax('actions/logout.php', resetUI);
	}

	// Pieces together UI components on user login
	// TODO: Make it asynchronous so we're not waiting for either function to return 
	function buildUI() {
		var meta = document.getElementById('meta');

		drawAddBeerForm();
		loadBeers();
		// meta.innerHTML = "TODO: Show UserID here"


		document.getElementById("add").addEventListener('click', addBeer, false);
		document.getElementById("paginate").addEventListener('click', paginate, false);	
		document.getElementById("logout").addEventListener('click', logout, false);							
	}

	// Returns UI to 'base' state on user logout
	function resetUI() {
		// Removes all list items from beers UL - could also set beers.innerHTML to empty string
		var beers = document.getElementById('beers');
		while (beers.firstChild) {
		    beers.removeChild(beers.firstChild);
		}

		removeElement(document.getElementById('addBeer'));
		removeElement(document.getElementById('paginate'));

		document.getElementById('meta').innerHTML = "";

		drawLoginForm();
		document.getElementById("login-btn").addEventListener('click', login, false);
	}	


	// AJAX utility
	function ajax(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					callback(JSON.parse(xhr.responseText));
					console.log("Request to " + url + " succeeded");
				}
				else {
					console.log("Request to " + url + " failed.");
				}
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	}

	// AJAX utility when dealing with form data 
	// TODO: Must be a way to wrap this into the previous function
	function formDataAjax(url, callback, formId) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					callback(JSON.parse(xhr.responseText));
					console.log("Request to " + url + " succeeded");
				}
				else {
					console.log("Request to " + url + " failed.");
				}
			}
		}
		xhr.open("POST", url, true);
		xhr.send(new FormData(formId));
	}

	// Upgraded addBeer function
	function addBeer() {
		if (event.preventDefault) {
			event.preventDefault();
		}
		var addBeer = document.getElementById('addBeer');
		formDataAjax('actions/add-beer.php', drawListItem, addBeer);
		clearTextInput('beerName');
	}

	// More succint function to get beers from database
	function loadBeers(userId) {
		ajax('actions/get-beers.php?userId=1', drawList);
		drawPaginationButton();
		document.getElementById("paginate").addEventListener('click', pagination, false);		
	}

	// Define template for list item
	function drawItem(content) {
		var template = document.getElementById('beerTpl').innerHTML;
		var html = Mustache.render(template, content);

		return html;
	}

	// Draws list on page load
	function drawList(content) {
		document.getElementById('beers').innerHTML = drawItem(content);
	}

	// Draws new item at top of list
	function drawListItem(content) {
		// var fragment = drawItem(content);
		// document.getElementById("beers").insertBefore(fragment, beers.firstChild);
		
		// Get old list content
		var oldListContent = document.getElementById('beers').innerHTML;

		

		// New HTML
		var newHTML = drawItem(content);

		// Glue together
		document.getElementById('beers').innerHTML = newHTML + oldListContent;

		// document.getElementById('beers').insertBefore(drawItem(content), beers.firstChild);
	}

	// Draws five more items at bottom of list
	function drawPaginationItems(content) {
		// var fragment = drawItem(content);
		document.getElementById('beers').innerHTML += drawItem(content);
		// document.getElementById("beers").appendChild(fragment);		
	}

	// Draws pagination button
	function drawPaginationButton() {
		var button = null;
		var fragment = document.createDocumentFragment();

		button = document.createElement('a');
		button.id = 'paginate';
		button.className = 'button';
		button.appendChild(document.createTextNode("More"));

		fragment.appendChild(button);
		insertAfter(beers, button);
	}

	// Renders pagination results	
	function pagination() {
		ajax('actions/paginate.php?offset=' + paginationOffset, drawPaginationItems);
		paginationOffset += 5;
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

	function insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
})();