/* standard game */

function GameWindow(){

	this.generate = function(){
		/* append the main body of the page */
		$("body").append(
			$("<div />",{id:"gamescreen_back"}),
			$("<div />",{id:"gamescreen"}).append(
				$("<div />",{id:"gs_display"}),
				$("<div />",{id:"gs_control"}),
				$("<div />",{id:"counter"})
			)
		);
		
		$("#gamescreen_back").click(function(){
			$("#gamescreen_back").remove();
			$("#gamescreen").remove();
		});
		
		var docH = $(document).width();
		var docW = $(document).height();
		var dim = (docH > docW) ? docW : docH;
				
		$("#gamescreen").height(dim-100);
		$("#gamescreen").width(dim-100);
		
		$(window).resize(function(){
			
			var docH = $(document).width();
			var docW = $(document).height();
			var dim = (docH > docW) ? docW : docH;
					
			$("#gamescreen").height(dim-100);
			$("#gamescreen").width(dim-100);
			
		});
	};
	
	this.destroy = function(){
		/* remove from body */
		$("#gamescreen").remove();
	};
	
}