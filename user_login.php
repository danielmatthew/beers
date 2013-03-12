<?php
include_once 'db_connection.php';
include_once 'class.users.php';
$user = new Users($db);

$user->login();

// if($_SESSION['username']){
// 	header('Location: /beers');
// }
// else {
// 	header('Location: /beers/register.php');
// }