<?php

//------------------------------------------------------
// GLOBALS

$nLeaders = 10;
$Leaders;
$LeaderFile = "data/leaders.json";


//------------------------------------------------------
// READ / WRITE

function readJSONFile(){
	global $LeaderFile;
	$contents = file_get_contents($LeaderFile);
	$data = json_decode($contents,true);
	return $data;
}

function writeJSONFile($contents){
	global $LeaderFile;
	$str = json_encode($contents,JSON_PRETTY_PRINT);
	$worked = file_put_contents($LeaderFile,$str);
	if(!$worked){ http_response_code(505); }
	else{ echo $str; }
	return;	
}



//------------------------------------------------------
// RETRIEVAL

function getLeaders(){
	$leaders = readJSONFile();
	echo json_encode( $leaders );
	
	return;
}


//------------------------------------------------------
// EDITING

// Leader Class
class leader{
	function __construct($person,$score,$rank,$code){
		$this->person = $person;
		$this->score = $score;
		$this->rank = $rank;
		$this->code = $code;
	}
};

// Load Leaders
function loadLeaders(){

	global $Leaders,$nLeaders;

	$leaders = readJSONFile();

	$lead_arr = $leaders["leaders"];
	//print_r($leaders);
	for($i = 0; $i < $nLeaders; $i++){
		
		$obj = array("name"=>"","score"=>"","rank"=>$i,"code"=>"");
		if(isset($lead_arr[$i])){ $obj = $lead_arr[$i]; }
		
		$Leaders[$i] = new leader(
						$obj["name"],
						$obj["score"],
						$obj["rank"],
						$obj["code"]);
	}
	//print_r($Leaders);
}

// Comparator for Ranking
function cmpScore($a,$b){
	if ($a->score == "") return 1;
	if ($b->score == "") return -1;
	if($a->score == $b->score){
		return ($a->rank < $b->rank)? -1:1;
	}
	return ($a->score < $b->score)? -1:1;
}

function saveLeaders(){

	global $Leaders,$nLeaders;

	uasort($Leaders,'cmpScore');
	
	$saveObj = array();
	$saveObj["leaders"] = array();

	$i = 1;
	foreach($Leaders as $lead){
		if ($i == $nLeaders+1) break;
		$saveObj["leaders"][] = array("rank"=>($i++),
										"name"=>$lead->person,
										"score"=>$lead->score,
										"code"=>$lead->code);
	}

	unset($Leaders);
	
	writeJSONFile($saveObj);

	loadLeaders();
}

function worstScore(){
	global $Leaders,$nLeaders;
	//return ($Leaders[$nLeaders-1]->score == "")? 100:$Leaders[$nLeaders-1]->score;
	return 100;
}

function submitScore(){
	global $Leaders,$nLeaders;
	
	$candidate = new leader(
					$_POST['name'],
					$_POST['score'],
					11,
					$_POST['code']);
					
	loadLeaders();
	
	// Check unique code.
	$good = true;	
	foreach($Leaders as $lead){
		if($lead->code == $candidate->code) $good = false;
	}
	
	$candidate->score = verifySolution( $candidate->code, $_POST["solution"]);
	
	// Score minimum. (for now)
	if($candidate->score < 0) $good = false;
	
	
	if ($good) $Leaders[$nLeaders-1] = $candidate;
	
	saveLeaders();
	
}

// GAME MANAGEMENT
include "game.php";

//------------------------------------------------------
// FUNCTION DIRECTORY

$function = "";

if(isset($_POST['function'])){ $function = $_POST['function']; }

if($function == "new_game") newGame();
if($function == 'get_leaders'){	getLeaders(); }
if($function == 'submit_score'){ submitScore(); }



?>
