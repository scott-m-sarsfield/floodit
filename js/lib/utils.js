/**
  * UTILS.JS
  * 
  * For functions and classes that aren't big enough for their own files
  */
  
 function ideally(x,y){
	return (x === undefined) ? y : x;
 }
  
 function InterPageMenu(){
	this.menu = $("<div />",{class:"inter-page-menu"});
	this.list = $("<ul />");
	this.menu.append(this.list);
	
	this.addItem = function(obj){
		var title = ideally(obj.title,"Item"+this.list.children().length);
		var id = ideally("#"+obj.id,"#");
		this.list.append($("<li />").append($("<a />",{href:id,text:title})));
	}
 }
