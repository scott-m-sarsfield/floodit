// Flood It
// 	
//
// Written by : Scott Sarsfield

//===============================================
//   Global Variables
//===============================================

// Color Library
var colors = Array();
colors[0] = 'red';
colors[1] = 'blue';
colors[2] = 'green';
colors[3] = 'yellow';
colors[4] = '#ff8000';
colors[5] = 'purple';

// Game Settings
var dimx;	// Horizontal size
var dimy;	// Vertical size
var nColors;	// # of colors

// Flood Map
var Map = Array();	// color ID
var Act = Array();	// active?

var nAct;		// # active

var ActSweep = new Deque();

var activeKeys = true;


// Score
var nTurns;

// Score of highest leaderboard scorer. 
var maxScore,HighScoreForm;

var leaders = Array();


//===============================================
//   SPLASH SCREEN FUNCTIONS
//===============================================

// Function: Creates the splash screen (display).
//
// Activated: By 'Back to Menu' button.
function splash(){
	/*
	// Instructions image
	var addText = "<img id='instr' src='splash.png' alt='Google the instructions...' />";

	$('#gs_display').html(addText);

	// Apply styles.
	$('#instr').css('box-shadow','none');

	// 'Play' button.
	$('#gs_control').html("<input id='start' type='button' onclick='launchGame()' value='PLAY' />");


	// Enable key functionality.
	$(document).keydown(function(){executeKey(event.which)});


	// Hide launch (for now).
	$('#gs_launch').hide();
	*/

}


// Function: Changes the x-dimension.
function setDimX(x){
	dimx = x;
}

// And others...

//===============================================
//   LAUNCH FUNCTION
//===============================================

// Function: Launches the game.
//
function launchGame(){
	$("body").append(
		$("<div />",{id:"gamescreen"}).append(
			$("<div />",{id:"gs_display"}),
			$("<div />",{id:"gs_control"}),
			$("<div />",{id:"counter"})
		)
	);
	
	startGame();
}

function startGame(){

	// Game specifications.
	dimx = 15;
	dimy = 15;
	nColors = 6;

	// Show launch panel.
	$('#gs_launch').show();
	
	// Activate keyboard functionality
	activeKeys = true;

	initialize();

	display();
	
	return;
}

//===============================================
//  INITIALIZATION
//===============================================

// Function: Initializes game variables / environment.
//
function initialize(){

	// Initialize the flood grid.
	// 	* Randomly Assigned Color
	// 	* Inactive
	for(i = 0; i < dimy; i++)
		for(j = 0; j < dimx; j++){
			var pos = i*dimx + j;
			Map[pos] = rand(0,nColors-1);
			Act[pos] = 0;
		}

	nTurns = -1;
	nAct = 0;

	init_table();	 // constructs table
	init_buttons();  // constructs buttons

	makeActive(0);   // activates top-left corner

	update(Map[0]);  // checks the area around origin
			 // for same-colored cells, and activates them


	return;
}

// Function: Constructs the table (grid) used.
//
function init_table(){

	// Clear the display.	
	$('#gs_display').html("");

	var addText = "";
	
	// Add HTML for table with 'dimx' width and 'dimy' height.
	addText += "<table>";
	
	for (i = 0; i < dimy; i++){
		addText += "<tr>";
	
		// Give each cell a unique ID to reference each one with.
		for(j = 0; j < dimx; j++){
			var pos = i*dimx +j;
			addText += "<td id='cell" + pos +"'></td>";
		}
		addText += "</tr>";
	}
		
	addText += "</table>";
	
	$('#gs_display').append(addText);

	// || Apply styles... ||

	// Cell Size
	// 	* Fill width with 'dimx' squares.
	var horz = 0.75*$("#gamescreen").height();$("#gamescreen").css("padding-top","5%");
	var bSize = Math.floor(parseInt(horz) / dimx);  
	$('#gs_display td').css('width',bSize+'px');
	$('#gs_display td').css('height',bSize+'px');

	// Border
	$('#gs_display td').css('border-style','solid');
	$('#gs_display td').css('border-color','black');
	$('#gs_display td').css('border-width','2pt');
	
	return;
}

// Function: Constructs the control buttons used.
//
function init_buttons(){

	var addText = "";

	// Create HTML for the buttons.	
	for(i = 0; i < nColors; i++){
		addText += "<input type='button' class='color_button' id='button"+i+"' onclick='update("+i+")' />";
	}

	$('#gs_control').html(addText);
	

	// Apply styles for the buttons
	for(i = 0; i < nColors; i++){
		$('#button'+i).css('background-color',colors[i]);
	}

	// Width
	// 	* Buttons should fill about 1/2 the width.
	var x = $('#gs_control').css('width');
	var x2 = Math.floor(parseInt(x) / (2*nColors));

	$('.color_button').css('height',x2+'px');
	$('.color_button').css('width',x2+'px');

	$('#counter').show();
	
	return;
}


//===============================================
//   MISC. HELP FUNCTIONS
//===============================================

// rand() - Returns a random number between 'start' and 'end' inclusive.
function rand(start,end){
	var val;
	val = (end+1) - start;
	return Math.floor((Math.random()*val)+start);
}

//===============================================
//   UPDATE / LOGIC FUNCTIONS
//===============================================	

// Function: Updates the variables with the 'chosen' color.
//
function update(chosen){

	// Prevents multiple clicks.
	if(((nTurns >= 0) && Map[0] == chosen) || nAct == (dimx*dimy)) return;

	// Put all activated cells into the 'ActSweep' array to check neighbors.
	for(i = 0; i < dimx*dimy; i++){
		if(Act[i]){
			Map[i] = chosen;
			ActSweep.pushFront(i);
		}
	}

	// Check all cells in the ActSweep deque for unactivated, but same-colored
	// cells.  When found, it will activate and add them to the deque to 
	// check their neighbors.	
	while(ActSweep.count != 0){
		var pos = ActSweep.popBack();
		checkNeighbors(pos,chosen);
	}

	// Increment the number of turns.
	nTurns++;

	// Update the display.
	display();

	//alert(nAct);
	if (nAct == dimx*dimy)	endGame();


	return;
}

// Function: Makes the 'pos' cell active in the flood.
//
function makeActive(pos){
Act[pos] = 1;  	// Indicate its active.
nAct++;		// Increment the number of Active.
}

// Function: Checks neighbors of the 'pos' cell for those of 'color' color.
// 	     When found, it adds them to the ActSweep deque, which will
// 	     check its neighbors and activate it.
//
function checkNeighbors(pos,color){
	
	// Activated non-activated cells.
	if(!Act[pos]){
		makeActive(pos);
	}

	var x = pos % dimx;
	var y = Math.floor(pos/dimx);

	// Right
	if (x < dimx-1)
		if(Map[pos+1]==color && !Act[pos+1]){
			ActSweep.pushFront(pos+1);
		}

	// Down
	if (y < dimy-1)
		if(Map[pos+dimx]==color && !Act[pos+dimx]){
			ActSweep.pushFront(pos+dimx);
		}

	// Left
	if (x > 0)
		if(Map[pos-1]==color && !Act[pos-1]) 
			ActSweep.pushFront(pos-1);
	
	// Up
	if (y > 0)
		if(Map[pos-dimx]==color && !Act[pos-dimx])
			ActSweep.pushFront(pos-dimx);
	
	return;
}

//===============================================
//   KEYBOARD COMMANDS
//===============================================

// Function: Handles the 'keydown' event within the game.
//
function executeKey(key){

	// Make sure that the keys are active.
	if(!activeKeys) return;

	//alert(key);	
	

	if(key == 13 || key == 82) // 'Return' and 'r' respectively
		launchGame();

	if(key == 65) update(0);	// 'A' - Color[0]
	if(key == 83) update(1);	// 'S' - Color[1]
	if(key == 68) update(2);	// 'D' - Color[2]
	if(key == 74) update(3);	// 'J' - Color[3]
	if(key == 75) update(4);	// 'K' - Color[4]
	if(key == 76) update(5);	// 'L' - Color[5]

	
	return;
}

//===============================================
//   DISPLAY FUNCTION
//===============================================

// Function: 	Updates the display.
//
// Activated:	Via update() and initialize()

function display(){
	
	// Updates colors of the grid from 'Map'.
	for(i = 0; i < dimy; i++)
		for(j = 0; j < dimx; j++){
			pos = i*dimx + j;
			$('#cell'+pos).css("background-color",colors[Map[pos]]);
		//	$('#cell'+pos).html(Act[pos] );
		}

	// Updates the counter.
	$('#counter').html("<h3>"+nTurns+"</h3>");

	return;
}

//===============================================
//   GAME OVER FUNCTION
//===============================================

// Function:	Displays the # of Turns and a minor form if it's a
// 		leaderboard worthy score.
//
// Activated: 	By update().

function endGame(){

	// Add HTML for the Results div.
	$('#gs_display').append('<div id="gs_results"></div>');
	
	var x = $("#gs_results");
	
	x.append( $("<br />"),
				$("<h1 />",{text:"You Win!"}),
				$("<br />"),
				$("<h2 />",{text:"It took you "+nTurns+" turns."})
			);
	

	// High Score Option
	if(nTurns < maxScore){
			
		var HighScoreForm = $("<div />");
		
		HighScoreForm.append($("<input />",{type:'text',id:'person'}));
		HighScoreForm.append($("<input />",{type:'hidden',id:"user_score",value:nTurns}));
		HighScoreForm.append($("<input />",{type:'hidden',id:"game_id",value:window.GameID}));
		
		var submitScoreButton = $("<input />",{type:'button',value:"Send In Score!"});
		submitScoreButton.click(function(){
			submitScore( $("#person").val(), $("#user_score").val(), $("#game_id").val() );
		})
		
		HighScoreForm.append( submitScoreButton );
		
		x.append( HighScoreForm );
		activeKeys = false;
	}
	

	// Establish Margins of the Results div.
	var x = parseInt($('#gs_display').css('width'));
	
	// Div will take 75% of the display panel.
	x = Math.floor(0.25*x/2);
	
	$('#gs_results').css('left',x+'px');
	$('#gs_results').css('right',x+'px');
}

// LEEEEEROOOOOYY  JEEEEEEEEEENNNNNKIIIIIINNNNSS
$(document).ready(function(){
	splash();
});

