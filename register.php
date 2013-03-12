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
	<h2>Register</h2>
	<form id="register" class="group" method="POST" action="user_login.php">
		<div>
			<input type="text" id="username" name="username" placeholder="Your username" autocorrect="off" autocomplete="off"></input>
			<button id="add" class="" type="submit">Register</button>
		</div>
	</form>
	<footer>
		<p class="copyright">&copy; 2013 Dashing Rogues</p>
	</footer>	
</body>
</html>