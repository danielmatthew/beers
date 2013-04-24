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
				document.getElementById("login-btn").addEventListener('click', login, false);
			}
		});
	}

	// Adds our load time event listeners
	function addEventListeners() {
		document.getElementById("logout").addEventListener('click', logout, false);
	}

	// Renders registration form
	function drawRegistrationForm() {
		var form,
			username,
			login,
			submit;

		var fragment = document.createDocumentFragment();
		var headers = document.getElementsByTagName('header');

		// Create form
		form = document.createElement('form');
		form.id = 'register';
		form.className = 'row group';

		// Create input
		username = document.createElement('input');
		username.id = 'username';
		username.setAttribute('name', 'username');
		username.setAttribute('type', 'text');
		username.setAttribute('placeholder', 'Your username');
		username.setAttribute('autocorrect', 'off');
		username.setAttribute('autocomplete', 'off');
		username.setAttribute('autocapitalize', 'off');

		// Create button
		submit = document.createElement('button');
		submit.id = 'register-btn';
		submit.setAttribute('type', 'submit');
		submit.className = 'button';
		submit.appendChild(document.createTextNode("Register"));

		// Build it
		form.appendChild(username);
		form.appendChild(submit);
		fragment.appendChild(form);

		insertAfter(headers[0], form);
	}

	// Renders login form
	function drawLoginForm() {
		var form,
			username,
			login,
			submit;

		var fragment = document.createDocumentFragment();
		var headers = document.getElementsByTagName('header');

		// Create form
		form = document.createElement('form');
		form.id = 'login';
		form.className = 'row group';

		// Create input
		username = document.createElement('input');
		username.id = 'username';
		username.setAttribute('name', 'username');
		username.setAttribute('type', 'text');
		username.setAttribute('placeholder', 'Your username');
		username.setAttribute('autocorrect', 'off');
		username.setAttribute('autocomplete', 'off');
		username.setAttribute('autocapitalize', 'off');

		// Create button
		submit = document.createElement('button');
		submit.id = 'login-btn';
		submit.setAttribute('type', 'submit');
		submit.className = 'button';
		submit.appendChild(document.createTextNode("Submit"));

		// Build it
		form.appendChild(username);
		form.appendChild(submit);
		fragment.appendChild(form);

		insertAfter(headers[0], form);
	}

	// DOM Helper to quickly add multiple attributes
	function addElementAttributes() {
		// Loop through argument array and add attribute for each
		for (var i = 0; i < Things.length; i++) {
			Things[i].setAttribute();
		};
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
		meta.innerHTML = "TODO: Show UserID here"


		document.getElementById("add").addEventListener('click', addBeer, false);
		document.getElementById("paginate").addEventListener('click', paginate, false);								
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
					callback(JSON.parse(this.responseText));
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

	// Utility function to augment objects
	Function.prototype.method = function(name, func) {
		this.prototype[name] = func;
		return this;
	};
})();
