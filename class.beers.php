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
	

	public function getBeers($userId = 1)
	{
		$sql = "SELECT *
				FROM beers
				WHERE user_id = ".$userId."
				ORDER BY id DESC LIMIT 10";
				
		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$beerId = $row['id'];
				$beerName = $row['name'];
				$beerRating = $row['rating'];
				$beerDescription = $row['description'];
				$this->drawBeerItem($beerId, $beerName);
				$_SESSION['beerId'] = $row['id'];
			}
			
			$stmt->closeCursor();
		}
		else 
		{
			echo "Something went wrong. ", $db->errorInfo;	
		}
	}

	public function getFiveMore($userId = 1, $offset = 10) {
		$sql = "SELECT *
				FROM beers
				WHERE user_id = ".$userId."
				ORDER BY id DESC 
				LIMIT 5 
				OFFSET ".$offset;
				
		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			
			// while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			// {
			// 	$moreBeers['beerName'] = $row['name'];
			// }
			$moreBeers = $stmt->fetchAll(PDO::FETCH_ASSOC);


			//print_r($moreBeers);

			echo json_encode($moreBeers);
			$stmt->closeCursor();
		}
		else 
		{
			echo "Something went wrong. ", $db->errorInfo;	
		}
		
	}

	private function drawBeerItem($beerId, $beerName) 
	{
		echo '<li id="'.$beerId.'">'.$beerName.'</li>';	
	}

	/**
	* Adds new beer to database
	* @return mixed: ID of new film on success
	*/
	public function addBeer()
	{
		$beerName = strip_tags($_POST['beerName']);
		
		$sql = "INSERT INTO beers (name) VALUES(:name)";
		
		try 
		{
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':name', $beerName, PDO::PARAM_STR);			
			$stmt->execute();
			$stmt->closeCursor();

			return $beerName;
		}
		catch(PDOException $e)
		{
			return $e->getMessage();
		}
	}

	public function generateTestData()
	{
		if(isset($_GET['text']))
		{
			$text = $_GET['text'];
		}
		else {
			$text = "No text set";
		}		
		return $text;
	}
}