var beerTracker = {};
beerTracker.indexedDB = {};

beerTracker.indexedDB.db = null;
beerTracker.indexedDB.open = function(){
	
	var request = indexedDB.open("beers");

	request.onsuccess = function(e){
		var version = "0.1";
		beerTracker.indexedDB.db = e.target.result;
		var db = beerTracker.indexedDB.db;

		if(version != db.version){
			var setVrequest = db.setVersion(version);
			
			setVrequest.onfailure = beerTracker.indexedDB.onerror;
			setVrequest.onsuccess = function(e) {
				var store = db.createObjectStore("beer", 
				{keypath: "timestamp"});
				e.target.transaction.oncomplete = function(){
					beerTracker.indexedDB.getBeers();
				};
			};	
		}
		else {
			request.transaction.oncomplete = function(){
				beerTracker.indexedDB.getBeers();
			};
		}
	};

	request.onfailure = beerTracker.indexedDB.onerror;
};

beerTracker.indexedDB.addBeer = function(beer){
	var db = beerTracker.indexedDB.db;
	var trans = db.transaction(["beer"], "readwrite");
	var store = trans.objectStore("beer");
	var request = store.put({
		"beer": beer,
		"timeStamp": new Date().getTime()
	});

	request.onsuccess = function(e){
		beerTracker.indexedDB.getAllBeers();
	};

	request.onerror = function(e){
		console.log(e.value);
	};
};

beerTracker.indexedDB.getBeers = function(){
	var beers = document.getElementById("beers");
	beers.innerHTML = '';
	
	var db = beerTracker.indexedDB.db;
	var trans = db.transaction(["beer"], "readwrite");
	var store = trans.objectStore("beer");
	
	// Get everything in the store;
	var keyRange = IDBKeyRange.lowerBound(0);
  	var cursorRequest = store.openCursor(keyRange);
  	
	cursorRequest.onsuccess = function(e) {
    	var result = e.target.result;
    	if(!!result == false)
      	return;

    	renderBeer(result.value);
    	result.continue();
  	};

  	cursorRequest.onerror = beerTracker.indexedDB.onerror;  		
};

function renderBeer(row){
	var beers = document.getElementById("beers");
	var li = document.createElement("li");
	var t = document.createTextNode();
	t.data = row.beer;

	li.appendChild(t);
	beers.appendChild(li);
}

function init(){
	beerTracker.indexedDB.open();
}

window.addEventListener("DOMContentLoaded", init, false);

function addBeer(){
	var beer = document.getElementById("beerName");
	beerTracker.indexedDB.addBeer(beer.value);
	beer.value = '';
}