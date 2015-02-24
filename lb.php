<?php

$nLeaders = 10;

// Leader Class
class leader{
	function __construct($person,$score,$rank,$code){
		$this->person = $person;
		$this->score = $score;
		$this->rank = $rank;
		$this->code = $code;
	}
}

// Declaration of Leader variable.

$Leaders;

// Load Leaders
function loadLeaders(){

	global $Leaders,$nLeaders;

	$leaderFile = fopen("leaders.txt",'r');

	$leaderString = "";

	while(!feof($leaderFile)){
		$buffer = fread($leaderFile,50);
		//echo $buffer;
		$leaderString = $leaderString.$buffer;
		$buffer = "";
	}

	fclose($leaderFile);

	$leaders = explode("#@#",$leaderString);

	for($i = 0; $i < $nLeaders; $i++){
		$Leaders[$i] = new leader($leaders[4*$i+1],
						$leaders[4*$i+2],
						$leaders[4*$i],
						$leaders[4*$i+3]);
	}
}

loadLeaders();

// Ability to add a leader.
if(isset($_POST['person'])){
	$newLead = new leader($_POST['person'],$_POST['score'],$nLeaders+1,$_POST['code']);
	
	//print_r($_POST);
	$good = true;	
	foreach($Leaders as $lead){
		if(!($lead->code - $newLead->code)) $good = false;
	}
	if ($good) $Leaders[$nLeaders-1] = $newLead;

	$_POST['score'] = 100;
}

saveLeaders();


// Comparator for Ranking
function cmpScore($a,$b){
	if ($a->score == "") return 1;
	if ($b->score == "") return -1;
	if($a->score == $b->score){
		// Birthday Gimmic
		if($a->person == "Lisa") return -1;
		if($b->person == "Lisa") return 1;

		return ($a->rank < $b->rank)? -1:1;
	}
	return ($a->score < $b->score)? -1:1;
}

function saveLeaders(){

	global $Leaders,$nLeaders;

	uasort($Leaders,'cmpScore');

	$leaderFile = fopen('leaders.txt','w');

	$i = 1;
	foreach($Leaders as $lead){
		if ($i == $nLeaders+1) break;
		$leadText = ($i++)."#@#".$lead->person."#@#".$lead->score."#@#".$lead->code."#@#";
		fwrite($leaderFile,$leadText);
	}
	fclose($leaderFile);

	unset($Leaders);

	loadLeaders();
}



// Printables

function printTable(){

	global $Leaders,$nLeaders;

	$i = 1;
	echo "<table>";
	echo "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";
	for($i = 1;$i <= $nLeaders; $i++){
		$lead = $Leaders[$i-1];
		echo "<tr>";
		echo "<td class='rank'>".($i)."</td>";
		echo "<td class='name'>".$lead->person."</td>";
		echo "<td class='score'>".$lead->score."</td>";
		echo "</tr>";
	}
	echo "</table>";	
}

function printSubmit(){
	echo "var HighScoreForm = '';";
	echo "HighScoreForm += \"<form action='#' method='post'>\";";
	echo "HighScoreForm += \"<input type='text' name='person' />\";";
	echo "HighScoreForm += \"<input type='hidden' id='user_score' value='9000' name='score' />\";";
	echo "HighScoreForm += \"<input type='hidden' value='".rand()."' name='code' />\";";
	echo "HighScoreForm += \"<input type='submit' value='Send In Score!' /></form>\";";
}

function addJava(){

	global $Leaders,$nLeaders;

	$mS = ($Leaders[$nLeaders-1]->score == "")? 100:$Leaders[$nLeaders-1]->score;

	echo "<script type='text/javascript'>";
	echo "maxScore = ".$mS.";";
	printSubmit();
	echo "</script>";
}

?>
