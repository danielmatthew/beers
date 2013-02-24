<?php

//Set error reporting level
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'constants.inc.php';

//Create DB object
try 
{
	$dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME;
	$db = new PDO($dsn, DB_USER, DB_PASS);
}
catch (PDOException $e)
{
	echo 'Connection failed: '. $e->getMessage();
	exit;
}