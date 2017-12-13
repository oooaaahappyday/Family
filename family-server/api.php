<?php
 	require_once("Rest.inc.php");

	class API extends REST {

		public $data = "";

		const DB_SERVER = "mokihfrinhresini.mysql.db";
		const DB_USER = "mokihfrinhresini";
		const DB_PASSWORD = "ProM1dpJo";
		const DB = "mokihfrinhresini";
		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initialise la connection à la bdd
		}

		// Connexion à la bdd
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}

		// Appelle la méthode dynamiquement en fonction des parametres de l'url
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // erreur 404 si pas de methode correspondant à la requete
		}


// GESTION INFORMATIONS RELATIONNELLES ENTRE MEMBRES FAMILLE
		// recupere la liste des individus portant le prenom requis
		private function memberswithfirstname(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			// nettoyage du prenom
			$prenom = filter_var((string)$this->_request['prenom'], FILTER_SANITIZE_STRING);
			if($prenom) {
				$query="SELECT * FROM familymember WHERE prenom = '$prenom'";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					}
					$this->response($this->json($result), 200); // renvoi les détails
				}
			$this->response('',204);	// Pas de données : "No Content" status
			}
		}

		//recupere un individu + freres/soeurs + parents + enfants
		private function familymember(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = filter_var((string)$this->_request['id'], FILTER_SANITIZE_STRING);
			$pere = filter_var((string)$this->_request['pere'], FILTER_SANITIZE_STRING);
			$mere = filter_var((string)$this->_request['mere'], FILTER_SANITIZE_STRING);

			if($id){
				$query="
				SELECT DISTINCT *
					FROM (
						SELECT Target.*
						FROM familymember As Target
						WHERE Target.id = '$id'
						UNION
						SELECT Sibling.*
						FROM familymember As Sibling
						WHERE (Sibling.pere = '$pere' AND Sibling.mere ='$mere')
						OR (Sibling.pere = '$pere')
						OR (Sibling.mere ='$mere')
						UNION
						SELECT Children.*
						FROM familymember As Children
						WHERE (Children.pere = '$id')
						OR (Children.mere ='$id')
						UNION
						SELECT Parents.*
						FROM familymember As Parents
						WHERE (Parents.id = '$pere')
						OR (Parents.id ='$mere')
					)
				AS Result";

				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){ // initialisation des arrays
					$result = array();
					$siblings = array();
					$children = array();
					$parents = array();
					while($row = $r->fetch_assoc()){
						if ($row['pere'] == $pere || $row['mere'] == $mere){ // freres/soeurs
							$siblings[] = $row;
						} else if ($row['pere'] == $id || $row['mere'] == $id){ // enfants
							$children[] = $row;
					} else {
							$parents[] = $row; // parents
						}
					}
					$result[0] = $siblings;
					$result[1] = $children;
					$result[2] = $parents;
				}
	 			$this->response($this->json($result), 200);
			}
			$this->response('',204);
		}

		// recupere les enfants d'un individu
		private function children(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (string)$this->_request['id'];

			if($id){
				$query="
				SELECT DISTINCT
					Sibling.*
						FROM familymember As Sibling
						WHERE (Sibling.pere = '$id')
						OR (Sibling.mere ='$id')
				";

				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					}
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
		}

		// recupere les parents d'un individu
		private function parents(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$pere = (string)$this->_request['pere'];
			$mere = (string)$this->_request['mere'];

			if($pere || $mere){
				$query="
				SELECT DISTINCT
					Parent.*
						FROM familymember As Parent
						WHERE (Parent.id = '$pere')
						OR (Parent.id ='$mere')
				";

				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){
					$result = array();
					while($row = $r->fetch_assoc()){
						$result[] = $row;
					}
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
		}

		// recupere un individu sans parents enregistres
		private function detailsnoparents(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (string)$this->_request['id'];

			if($id){
				$query="
				SELECT DISTINCT *
					FROM (
						SELECT Target.*
						FROM familymember As Target
						WHERE Target.id = '$id'
						UNION
						SELECT Children.*
						FROM familymember As Children
						WHERE (Children.pere = '$id')
						OR (Children.mere ='$id')
					)
				AS Result";

				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){
					$result = array();
					$member = array();
					$children = array();
					while($row = $r->fetch_assoc()){
						if ($row['id'] == $id){
							$member[] = $row;
						} else if ($row['pere'] == $id || $row['mere'] == $id){
							$children[] = $row;
						}
					}
					$result[0] = $member;
					$result[1] = $children;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
		}
		// recupere les individus par genre
		private function genres(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}

				$query="
				SELECT DISTINCT *
					FROM (
						SELECT Homme.*
						FROM familymember As Homme
						WHERE Homme.genre = 'homme'
						UNION
						SELECT Femme.*
						FROM familymember As Femme
						WHERE Femme.genre = 'femme'
					)
				AS Result";

				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0){
					$result = array();
					$femmes = array();
					$hommes = array();
					while($row = $r->fetch_assoc()){
						if ($row['genre'] == 'homme'){
							$hommes[] = $row;
						} else {
							$femmes[] = $row;
						}
					}
					$result[0] = $femmes;
					$result[1] = $hommes;
				}
				$this->response($this->json($result), 200);

			$this->response('',204);
		}


// GESTION ENTITE MEMBRE
		private function member(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="SELECT distinct c.id, c.prenom, c.nom, c.email, c.adresse, c.email, c.telephone, c.pere, c.mere, c.naissance, c.conjoint, c.photo, c.genre FROM familymember c where c.id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // Renvoie les détails du member
				}
			}
			$this->response('',204);	// Pas d'enregistrement = "No Content" status
		}
		private function insertMember(){
			// premiere requete OPTIONS envoyée par browser: check same domain
			if($this->get_request_method() != "POST" && $this->get_request_method() != "OPTIONS"){
				$this->response('',406);
			}

			$newMember = json_decode(file_get_contents("php://input"),true);
			$column_names = array('prenom', 'nom', 'naissance', 'telephone', 'email', 'adresse', 'pere', 'mere', 'conjoint', 'photo', 'genre');
			$keys    = array_keys($newMember);
			$columns = '';
			$values  = '';
			foreach($column_names as $desired_key){ // Check the newMember received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $newMember[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO familymember(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($newMember)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $newMember);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}

		/*
		 *	Encodage $data en JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}

	// Initialise l'api

	$api = new API;
	$api->processApi();
?>
