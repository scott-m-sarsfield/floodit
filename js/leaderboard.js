// leaderboard.js
//
// 		JavaScript file to maintain the reading / writing / display of the leaderboard.
//
// Written by: Scott Sarsfield
// (C) 2015

window.MaxScoreToSubmit = 100;
window.HighScoreForm = "";
window.maxScore = window.MaxScoreToSubmit;

function getLeaderboard(){
	
	$.ajax("lb.php",{
		type:'POST',
		data:{
			'function':'get_leaders'
		},
		statusCode:{
			200:function(data,status,jqXHR){
				//console.log(data);
				var json = JSON.parse(data);
				//console.log(json);
				updateLeaderboard(json);
			}
		}
		
	});
}

function submitScore(name,score,code){
	
	var obj = {
			'function':'submit_score',
			'name':name,
			'score':score,
			'code':code,
			'solution':window.soln
	};
	
	$.ajax("lb.php",{
		type:'POST',
		data:obj,
		statusCode:{
			200:function(data,status,jqXHR){
				//console.log(data);
				var json = JSON.parse(data);
				//console.log(json);
				updateLeaderboard(json);
				
				// temp fix
				//location.reload();
				//alert("Save Sent.");
				$("#gamescreen").remove();
				window.GameID++;
			},
			505:function(){
				alert("Save Failed.");
				$("#gamescreen").remove();
			}
		}
		
	});
}

function updateLeaderboard(obj){
	if(!obj){ console.warn("Bad update."); }
	if(!obj["leaders"]){ console.warn("Bad update."); }
	
	window.maxScore = 0;
	
	for(var i = 0; i < 10; i++){
		var o = obj["leaders"][i];
		if(!o){ window.maxScore = 100; continue;}
		var x = $(".sora_leaderboard #row"+i);
		x.children(".rank").text( (i+1) );
		x.children(".name").text( o.name );
		x.children(".score").text( o.score );
		
		if( o.score == ""){ window.maxScore = 100; }
		if( parseInt(o.score) > maxScore ){ window.maxScore = parseInt(o.score); }
	}
	
}

function renderLeaderboard(){
	
	var lb = $("<table />",{class:"sora_leaderboard"});
	
	var lb_h = $("<thead />");
	
	lb_h.append( 
		$("<tr />").append(
			$("<th />",{text:"Rank"}),
			$("<th />",{text:"Name"}),
			$("<th />",{text:"Score"})
		)
	);
	
	var lb_b = $("<tbody />");
	
	for(var i = 0; i <= 9; i++){
		lb_b.append(
			$("<tr />",{id:"row"+i}).append(
				$("<td />",{class:"rank",text:(i+1)}),
				$("<td />",{class:"name"}),
				$("<td />",{class:"score"})
			)
		);			
	}
	
	lb.append(lb_h,lb_b);
		
	return lb;
	
}


$(document).ready(function(){
	getLeaderboard();
	//submitScore("Scott",101,774404);
});

