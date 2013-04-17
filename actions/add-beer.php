<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/db_connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.beers.php';

$beer = new Beers($db);
$beer->addBeer();