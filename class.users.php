<?php

class Users
{
	/**
	* The database object
	* @var object
	*/
	private $_db;
	
	/**
	* Checks for database object and creates one if none is found
	* @param object $db
	* @return void
	*/
	public function __construct($db = NULL)
	{
		if(is_object($db))
		{
			$this->_db = $db;
		}
		else 
		{
			$dsn = 'mysql:host='.DB_HOST.'dbname='.DB_NAME;
			$this->_db = new PDO($dsn, DB_USER, DB_PASS);
		}
	}
	

	/**
	* Adds new user to database
	* @return mixed: ID of new film on success
	*/
	
	public function addUser()
	{
		$username = strip_tags($_POST['username']);
		$email = strip_tags(sha1($_POST['email']));
		
		$sql = "INSERT INTO users (user_name, user_email)
				VALUES(:name, :email)";

		try 
		{
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':name', $username, PDO::PARAM_STR);
			$stmt->bindParam(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$stmt->closeCursor();

			$userID = $this->_db->lastInsertId();
			$_SESSION['userid'] = $userID;
		}
		catch(PDOException $e)
		{
			return $e->getMessage();
		}
	}

	public function login() 
	{
		if(isset($_POST['username'])){
			$username = strip_tags($_POST['username']);
		}
		else {
			
		}

		$sql = "SELECT *
				FROM users
				WHERE user_name=:user
				LIMIT 1";

		try {
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':user', $username, PDO::PARAM_STR);
			$stmt->execute();
			$stmt->closeCursor();
			if ($stmt->rowCount() == 1) {
				$_SESSION['username'] = htmlentities($username, ENT_QUOTES);
				return true;
			}
			else {
				return false;
			}
		}
		catch(PDOException $e) {
			return false;
		}
	}

	public function getUserId($username) 
	{
		$sql = "SELECT user_id FROM users where user_name = :user";

		try {
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':user', $username, PDO::PARAM_STR);
			$stmt->execute();
			$stmt->bindColumn('user_id', $userId);
			$stmt->fetch();
			$stmt->closeCursor();
			
			$_SESSION['userid'] = $userId;

			return $userId;
		}
		catch(PDOException $e) {
			return false;
		}
	}

	public function test() {
		return 'hello';
	}
}