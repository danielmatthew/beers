<?php
include_once 'db_connection.php';
include_once 'class.beers.php';
$beer = new Beers($db);
$beer->addBeer();
return '<?xml version="1.0" ?><root>A test</root>';
//header('Location: http://macintosh.local/beers/');
