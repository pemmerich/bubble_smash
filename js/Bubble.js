(function() {

var Bubble = function(color) {
  this.initialize(color);
}
var p = Bubble.prototype = new createjs.Container(); // inherit from Container
p.background;
p.count = 0;
p.bubbleTypes = ["red","blue","yellow","green"];
p.bubbleType;
p.radius = 15;

p.Container_initialize = p.initialize;
p.initialize = function(radius) {
	this.Container_initialize();
	
	if (radius)
		this.radius = radius;
	
	this.bubbleType = this.bubbleTypes[Math.floor(Math.random() * this.bubbleTypes.length)];
	
	if(this.bubbleType == "red")
		color = "#ff0000";
	else if(this.bubbleType == "blue")
		color = "#3366ff";
	else if(this.bubbleType == "yellow")
		color = "#ffff33";
	else if(this.bubbleType == "green")
		color = "#339933";
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawCircle(0, 0, this.radius);
	//must explicitly set bounds
	this.setBounds(0,0,this.radius*2,this.radius*2);
	
	this.on("click", this.handleClick);
	this.on("tick", this.handleTick);

	this.addChild(this.background); 
	this.mouseChildren = false;
} 

p.handleClick = function (event) {    
	var target = event.target;
	alert("You clicked on a button: "+ target.label);
} 

p.handleTick = function(event) {   

	//p.alpha = Math.cos(p.count++*0.1)*0.4+0.6;
}

window.Bubble = Bubble;
}());