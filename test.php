<?php
include_once 'db_connection.php';
include_once 'class.beers.php';
$beer = new Beers($db);

$offset = $_GET['offset'];

json_encode($beer->getFiveMore(1, $offset));