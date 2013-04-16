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
	<noscript>Unfortunately this web app requires JavaScript to be enabled. Sorry about that.</noscript>

<section class="content row">
	<ul id="beers">
		<p id="loading">Loading content</p>
	</ul>
	<div class="pagination group">
		<a id="paginate" class="btn">More</a>
	</div>
</section>
<?php include('footer.php');?>