<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/db_connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.beers.php';
$beer = new Beers($db);

$offset = $_GET['offset'];

json_encode($beer->paginate(5, 1, $offset));