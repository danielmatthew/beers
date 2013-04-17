<?php
session_start();

if (isset($_SESSION['userid'])) {
	echo json_encode(1);
}
else {
	echo json_encode(0);
}