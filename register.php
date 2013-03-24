<?php include('header.php');?>
	<p class="intro">Like beer? Keep track of your tipples with this handy app.</p>

	<form id="register" class="group row" method="POST" action="user_register.php">
		<div>
			<input type="email" name="email" placeholder="Your email address" autocorrect="off"></input>
			<input type="text" id="username" name="username" placeholder="Your username" autocorrect="off" autocomplete="off"></input>
			<button id="register-btn" class="button" type="submit">&#10004;</button>
		</div>
	</form>
<?php include('footer.php');?>