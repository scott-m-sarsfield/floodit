var NULL = null;

function Node(data,prev,next){
	this.data = data;
	this.prev = prev;
	this.next = next;
}

function Deque(){
	
	this.head = null;
	this.tail = null;
	this.count = 0;

	this.pushFront = pushFront;
	function pushFront(y){
		x = new Node(y,null,this.head);

		if(this.head != null)
			this.head.prev = x;
		if(this.tail == null)
			this.tail = x;

		//alert(this.tail);
		//alert(this.toString());

		this.head = x;
	
		this.count++;
	}

	this.pushBack = pushBack;
	function pushBack(y){
		x = new Node(y,this.tail,null);

		if(this.tail != null)
			this.tail.next = x;
		if(this.head == null)
			this.head = x;
		
		this.tail = x;
	
		this.count++;
	}

	this.popFront = popFront;
	function popFront(){
		if(this.count == 0)
			return;
		//alert(this.head.data);
		var value = this.head.data;
		this.head = this.head.next;
		if(this.head != null) this.head.prev = null;
		else this.tail = null;	
		this.count--;

		return value;
	}

	this.popBack = popBack;
	function popBack(){
		if(this.count == 0)
			return;
		var value = this.tail.data;
		this.tail = this.tail.prev;
		if(this.tail != null) this.tail.next = null;
		else this.head = null;	
	
		this.count--;

		return value;
	}

	this.clear = clear;
	function clear(){

		while(this.count != 0)
			this.popFront();
	}


	this.toString = toString;
	function toString(){
	
		var scout = this.head;
		var txt = "Deque ("+this.count+"): ";

		while(scout != NULL){
			txt += "["+scout.data+"] <-> ";
		
			scout = scout.next;
		}
		
		txt += "NULL";

		return txt;
	}

	this.toRevString = toRevString;
	function toRevString(){
		var scout = this.tail;
		var txt = "Deque ("+this.count+"): ";
		
		while(scout != null){
			txt += "["+scout.data+"] <-> ";
			scout = scout.prev;
		}

		txt += "NULL";
		
		return txt;
	}

}

	
	


