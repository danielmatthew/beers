<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/db_connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/beers/classes/class.users.php';
$user = new Users($db);

$user->getUserId($_REQUEST['username']);

// if(isset($_SESSION['userid'])) {
// 	session_write_close();
// 	//header('Location: /beers/index.php');
// }
// else {
// 	//header('Location: /beers/login.php?error=nouserfound');
// }
