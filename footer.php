	<footer class="row">
		<div class="meta">
			<p id="meta"></p>
			<a id="logout">Logout</a>		
		</div>

		<p class="copyright">&copy; 2013 Dashing Rogues</p>
	</footer>	
</body>
	<script async src="assets/js/mustache.js"></script>
	<script async src="assets/js/app.js"></script>
	<script async type="text/javascript">
	  (function() {
	    var config = {
	      kitId: 'jhq4goh',
	      scriptTimeout: 3000
	    };
	    var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
	  })();
	</script>
	<?php include('login-form-template.php');?>
	<?php include('registration-form-template.php');?>
	<?php include('list-item-template.php');?>
</html>
