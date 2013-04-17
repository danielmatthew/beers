<?php include('header.php');?>
	<?php 
		if (isset($_GET['error']) && $_GET['error'] == "nouserfound") {
			echo "No user exists with this username! Please try again.";
		}
	?>
	<p class="row">Please login to begin keeping a record of your beers.</p>
	<form id="login" class="group row" method="POST" action="actions/user_login.php">
		<div class="group">
			<input type="text" id="username" name="username" placeholder="Your username" autocorrect="off" autocomplete="off"></input>
			<button id="login-btn" class="button" type="submit">&#10004;</button>
		</div>
		<?php if (isset($_SESSION['userid'])) {
			echo '<p class="group">We couldn\'t find a record of your username - <a href="register.php">register now</a> to keep track of your beers.</p>';
		}
		?>
	</form>
<?php include('footer.php');?>