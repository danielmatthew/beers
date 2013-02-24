var serverAddress = 'beer.php';
var showErrors = true;

function submit() {
	//POST data
	var data = "beerName" + beerName;

	var settings = {
		url: serverAddress,
		type: "POST",
		async: true,
		complete: function(xhr, response, status) {
			if (xhr.responseText.indexOf("ERRNO") >= 0 || xhr.responseText.indexOf("error:") >= 0 || xhr.responseText.indexOf("ERRNO") == 0) {
				alert(xhr.responseText.length == 0 ? "Server error" : response);
			}
			result = response.result;		
		},
		data: data,
		showErrors: showErrors
	};

	var xmlHttp = new XmlHttp(settings);
}