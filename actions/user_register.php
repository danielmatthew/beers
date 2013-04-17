<?php
session_start();
include_once 'db_connection.php';
include_once 'class.users.php';
$user = new Users($db);

$user->addUser();

if(isset($_SESSION['userid'])) {
	session_write_close();
	header('Location: /beers/index.php');
}
else {
	header('Location: /beers/login.php');
}

//if($_SESSION['username']){
// 	header('Location: /beers');
// }
// else {
// 	header('Location: /beers/register.php');
// }