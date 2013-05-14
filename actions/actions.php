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
	case 'paginate':
		$beer = new Beers($db);
		$offset = $_GET['offset'];
		json_encode($beer->paginate(5, 1, $offset));
		break;
	case 'register':
		$user = new Users($db);
		$user->addUser();
		if(isset($_SESSION['userid'])) {
			session_write_close();
			header('Location: /beers/index.php');
		} else {
			header('Location: /beers/login.php');
		}		
		break;
	case 'login':
		$user = new Users($db);
		$user->getUserId($_REQUEST['username']);
		break;
	case 'checkSession':
		if (isset($_SESSION['userid'])) {
			echo json_encode(1);
		} else {
			echo json_encode(0);
		}
		break;
	case 'logout':
		session_start();
  		session_unset();
    	session_destroy();
    	session_write_close();
    	echo json_encode(1);
		break;
	default:
		echo 'Default';
		break;
}