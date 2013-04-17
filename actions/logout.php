<?php
	
	session_start();
  	session_unset();
    session_destroy();
    session_write_close();

    echo json_encode(1);

    // header('Location: /beers/login.php');
