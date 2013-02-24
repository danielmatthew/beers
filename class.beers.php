<?php

class Beers
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
	

	public function getBeers()
	{
		$sql = "SELECT *
				FROM beers
				ORDER BY id DESC LIMIT 10";
				
		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			//var_dump($row);
			{
			
				$beerName = $row['name'];
				$beerRating = $row['rating'];
				$beerDescription = $row['description'];
								
				echo '<li>' . $beerName . '</li>';
			}
			
			$stmt->closeCursor();
		}
		else 
		{
			echo "Something went wrong. ", $db->errorInfo;	
		}

	}
	
	/**
	* Adds new beer to database
	* @return mixed: ID of new film on success
	*/
	
	public function addBeer()
	{
		$beerName = strip_tags($_POST['beerName']);
		//$viewed = strip_tags($_POST['film-viewed']);
		//$rating = strip_tags($_POST['film-rating']);
		//$summary = $_POST['film-summary'];
		
		$sql = "INSERT INTO beers
					(name)
				VALUES(:name)";
		
		try 
		{
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':name', $beerName, PDO::PARAM_STR);		
			//$stmt->bindParam(':rating', $rating, PDO::PARAM_INT);		
			//$stmt->bindParam(':viewed', $viewed, PDO::PARAM_STR);		
			//$stmt->bindParam(':summary', $summary, PDO::PARAM_STR);		
			$stmt->execute();
			$stmt->closeCursor();
					
			return $this->_db->lastInsertId();
		}
		catch(PDOException $e)
		{
			return $e->getMessage();
		}
	}
}