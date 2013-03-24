<?php
include_once 'db_connection.php';
include_once 'class.beers.php';
$beer = new Beers($db);

echo json_encode($beer->drawFiveMore());