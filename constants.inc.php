<?php

if ($_SERVER['SERVER_NAME'] == 'macintosh.local') {
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASS', 'root');
	define('DB_NAME', 'beer');	
}
else {
	define('DB_HOST', 'localhost');
	define('DB_USER', 'danmatth_admin');
	define('DB_PASS', 'upyours1');
	define('DB_NAME', 'danmatth_beers');
}

