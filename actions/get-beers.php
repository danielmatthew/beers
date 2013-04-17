<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/db_connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.beers.php';
$beer = new Beers($db);

if (isset($_SESSION['userid'])) {
	$beer->getBeers($_SESSION['userid']);
}
else {
	echo '<p>No beers added yet - <a href="login.php">please log in!</a></p>';
}
