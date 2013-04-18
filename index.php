<?php 
session_start();
include_once 'db_connection.php';
include_once 'classes/class.beers.php';
$beers = new Beers($db);

include('header.php');
?>

<noscript>Unfortunately this web app requires JavaScript to be enabled. Sorry about that.</noscript>

<section class="content row">
	<ul id="beers"></ul>
</section>
<?php include('footer.php');?>