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
				alert(xhr.responseText);
			} else {
				alert("Request was unsuccessful: " + xhr.status);
			} 		
		}
	}
	xhr.open("post", "http://macintosh.local/beers/beer.php", true);
	var form = document.getElementById("addBeer");
	xhr.send(new FormData(form));	
}