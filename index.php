<?php 
include_once 'db_connection.php';
include_once 'class.beers.php';
$beers = new Beers($db);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Beers</title>

	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="initial-scale=1.0">

	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="touch-icon-iphone-retina.png" />
	<link rel="apple-touch-startup-image" href="beers@2x.png" sizes="640x920"/>
	<link rel="apple-touch-startup-image" href="beers_large@2x.png" sizes="640x1096"/>
	
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" /> 

	<link rel="stylesheet" type="text/css" href="beers.css">

	<script type="text/javascript">
	  (function() {
	    var config = {
	      kitId: 'jhq4goh',
	      scriptTimeout: 3000
	    };
	    var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
	  })();
	</script>
</head>
<body>
	<h1>BYOB</h1>
	<p class="intro">Like beer? Keep track of your tipples with this handy app.</p>
	<form id="addBeer" class="group" action="beer.php" method="POST">
		<div>
			<input type="text" id="beerName" name="beerName" placeholder="An example pint" autocorrect="off"></input>
			<!-- <a id="add" class="button">+</a> -->
			<button id="add" class="button" type="submit">+</button>
		</div>
	</form>
	<ul id="beers">
		<?php 
			$beers->getBeers();
		?>
	</ul>
	<footer>
		<p class="copyright">&copy; 2013 Dashing Rogues</p>
	</footer>
	<!--<script type="text/javascript" src="beers.js"></script>-->
	<script type="text/javascript" src="ajax.js"></script>
</body>
</html>