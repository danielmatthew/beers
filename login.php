<?php include('header.php');?>
	<form id="login" class="group row" method="POST" action="user_login.php">
		<div>
			<input type="text" id="username" name="username" placeholder="Your username" autocorrect="off" autocomplete="off"></input>
			<button id="login-btn" class="button" type="submit">&#10004;</button>
		</div>
		<p class="group">We couldn't find a record of your username - <a href="register.php">register now</a> to keep track of your beers.</p>
	</form>
<?php include('footer.php');?>