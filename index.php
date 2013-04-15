<?php 
session_start();
include_once 'db_connection.php';
include_once 'class.beers.php';
$beers = new Beers($db);

include('header.php');
?>
	<form id="addBeer" class="group row" method="POST">
		<div>
			<input type="text" id="beerName" name="beerName" placeholder="An example pint" autocorrect="off"></input>
			<button id="add" class="button" type="submit">+</button>
		</div>
	</form>
<section class="content row">
	<ul id="beers">
		<?php
		 	if(isset($_SESSION['userid'])) {
		 		$beers->getBeers($_SESSION['userid']);
		 	}
		 	else {
		 		echo '<p>No beers added yet - <a href="login.php">please log in!</a></p>';
		 	}
			
		?>
	</ul>
	<div class="pagination group">
		<a id="paginate" class="btn">More</a>
	</div>
</section>
<?php include('footer.php');?>