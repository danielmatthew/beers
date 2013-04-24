<?php 
session_start();

include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/db_connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.beers.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.users.php';

switch ($action) {
	case 'add':
		$beer = new Beers($db);
		$beer->addBeer();
		break;
	case 'register':
		$user = new Users($db);
		$user->addUser();
		break;
	case 'login':
		break;
	case 'logout':
		break;
	default:
		# code...
		break;
}