<?php

	$GamesFile = "data/games.json";

	function newGame(){
		global $GamesFile;
		$x = file_get_contents($GamesFile);
		$y = json_decode($x,true);
		
		$code = rand();
		while( isset($y[$code]) ){ $code = rand(); }
		
		$y[$code] = initializeMap();
		
		file_put_contents($GamesFile, json_encode($y,JSON_PRETTY_PRINT));
		
		$game_info = array("map"=>$y[$code],"code"=>$code);
		$printout = json_encode($game_info);
		echo $printout;
	}

	function initializeMap(){
		
		$dimx = 15;
		$dimy = 15;
		$nColors = 6;
		$map = array();
		
		for($i = 0; $i < $dimx*$dimy; $i++){
			$map[ $i ] = rand(0,$nColors - 1);
		}
		
		return $map;
	}
	
	//-----------------------------------------------------------
	
	function getMap($code){
		global $GamesFile;
		$x = file_get_contents($GamesFile);
		$y = json_decode($x, true);
		
		return $y[ $code ];
	}
	
	function applyMove(&$map,&$active,$move){
		
		$active_sweep = array();
		
		// Put active cells in queue to check neighbors.
		for($i = 0; $i < sizeof($active); $i++){
			if($active[$i]){ 
				$map[$i] = $move;
				array_push($active_sweep,$i); 
			}
		}
		
		// Check cells in queue for unactive, but same-colored cells.
		while( sizeof($active_sweep) != 0){
			$i = array_pop($active_sweep);
			
			$x = $i % 15;
			$y = floor( $i / 15 );
			
			// Right
			if( $x < 14 ){ 
				if( $map[$i+1] == $move && !$active[$i+1]){ 
					$active[$i+1] = 1;
					array_push($active_sweep,$i+1);
				}
			}
			
			// Down
			if( $y < 14 ){ 
				if( $map[$i+15] == $move && !$active[$i+15]){ 
					$active[$i+15] = 1;
					array_push($active_sweep,$i+15);
				}
			}
			
			// Left
			if( $x > 0 ){ 
				if( $map[$i-1] == $move && !$active[$i-1]){ 
					$active[$i-1] = 1;
					array_push($active_sweep,$i-1);
				}
			}
			
			// Right
			if( $y > 0 ){ 
				if( $map[$i-15] == $move && !$active[$i-15]){ 
					$active[$i-15] = 1;
					array_push($active_sweep,$i-15);
				}
			}
		}
	}
	
	function verifySolution($code,$solution){
		$map = getMap($code);
		
		// ensure existence of map
		if(!isset($map)) return -1;
		if(!is_array($map)) return -1;
		
		// initialize active
		$active = array(); $active[0] = 1;
		for($i = 1; $i < 15*15; $i++) $active[$i] = 0;
		
		// apply initial and subsequent moves
		applyMove($map,$active,$map[0]);
		for($i = 0; $i < sizeof($solution); $i++){
			applyMove($map,$active,$solution[$i]);
		}
		
		// verify map is solved.
		$final_color = $map[0]; $solved = true;
		for($i = 0; $i < 15*15; $i++){
			if($map[$i] != $final_color){ $solved = false; break; }
		}
		
		// return length of solution as verification.
		if(!$solved) return -1;
		return sizeof($solution);
	}
	
	
	//$function = "";
	
	//if(isset($_POST["function"])) $function = $_POST["function"];
	

	//echo verifySolution("1",[0,2]);

?>

