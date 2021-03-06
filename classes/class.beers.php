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
		$sql = "SELECT id, name, date_drunk
				FROM beers
				WHERE user_id = ".$userId."
				ORDER BY date_drunk DESC LIMIT 10";

		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			$beers = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($beers);

			//$beers = array();
			// while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			// {
			// 	array_push($beers, $row['id'], $row['name']);
			// 	// $beerId = $row['id'];
			// 	// $beerName = $row['name'];
			// 	// $this->drawBeerItem($beerId, $beerName);
			// 	// $_SESSION['beerId'] = $row['id'];
			// }
			// echo json_encode($beers);
			$stmt->closeCursor();
		}
		else
		{
			echo "Something went wrong. ", $db->errorInfo;
		}
	}

	public function paginate($numberOfResults, $userId = 1, $offset) {
		$sql = "SELECT *
				FROM beers
				WHERE user_id = ".$userId."
				ORDER BY date_drunk DESC
				LIMIT ".$numberOfResults."
				OFFSET ".$offset;

		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			$moreBeers = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
		echo '<li id="'.$beerId.'">';
		echo '<img src="assets/img/thumb.png">';
		echo '<h1>'.$beerName.'</h1>';
		echo '</li>';
	}

	public function addBeer()
	{
		$userId = $_SESSION['userid'];

		$sql = "SELECT id, name, date_drunk
				FROM beers
				WHERE user_id = ".$userId." AND ". $this->insert() ."
				ORDER BY date_drunk DESC LIMIT 1";

		if($stmt = $this->_db->prepare($sql))
		{
			$stmt->execute();
			$beers = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode(array_reverse($beers));

			//$beers = array();
			// while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			// {
			// 	array_push($beers, $row['id'], $row['name']);
			// 	// $beerId = $row['id'];
			// 	// $beerName = $row['name'];
			// 	// $this->drawBeerItem($beerId, $beerName);
			// 	// $_SESSION['beerId'] = $row['id'];
			// }
			// echo json_encode($beers);
			$stmt->closeCursor();
		}
		else
		{
			echo "Something went wrong. ", $db->errorInfo;
		}
	}

	/**
	* Adds new beer to database
	* @return mixed: ID of new beer on success
	*/
	private function insert()
	{
		$userId = $_SESSION['userid'];
		$beerName = htmlentities(strip_tags(trim($_REQUEST['beerName'])));
		$dateDrunk = date('Y-m-d H:i:s');

		$sql = "INSERT INTO beers (user_id, name, date_drunk) VALUES(:user_id, :name, :date_drunk)";

		try
		{
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
			$stmt->bindParam(':name', $beerName, PDO::PARAM_STR);
			$stmt->bindParam(':date_drunk', $dateDrunk, PDO::PARAM_STR);
			$stmt->execute();
			$stmt->closeCursor();

			return $id = $this->_db->lastInsertId();
		}
		catch(PDOException $e)
		{
			return $e->getMessage();
		}
	}

	public function deleteBeer($beerId) {
		$sql = "DELETE FROM beers WHERE id = :beerId";

		try {
			$stmt = $this->_db->prepare($sql);
			$stmt->bindParam(':beerId', $beerId, PDO::PARAM_INT);
			$stmt->execute();
			$stmt->closeCursor();
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

	public function getMostPopularBeer() {
		$sql = "SELECT name FROM beers GROUP BY name ORDER BY count(*) LIMIT 1";

		try {
			$stmt = $this->_db->prepare($sql);
			$stmt->execute();
			$beers = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$stmt->closeCursor();

			return $beers;
		}
		catch(PDOException $e) {
			return $e->getMessage();
		}
	}

	public function getNumberOfBeers() {
		$sql = "SELECT COUNT(*) FROM beers";

		try {
			$stmt = $this->_db->prepare($sql);
			$stmt->execute();
			$beers = $stmt->fetchColumn();
			$stmt->closeCursor();

			return $beers;
		}
		catch(PDOException $e) {
			return $e->getMessage();
		}
	}

	public function getTopRatedBeer() {

	}

	public function getMostPopularBrewer() {

	}
}