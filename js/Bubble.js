(function() {

var Bubble = function(radius,types) {
  this.initialize(radius,types);
}
var p = Bubble.prototype = new createjs.Container(); // inherit from Container
p.background;
p.count = 0;
p.bubbleTypes = ["#ff0000","#3366ff"];
p.type;
p.radius = 15;
p.row;
p.column;

p.Container_initialize = p.initialize;
p.initialize = function(radius,types) 
{
	//console.log("init bubble types = "+types);
	this.Container_initialize();
	
	if (radius)
		this.radius = radius;
	
	if(types)
		this.bubbleTypes = types;
	
	this.type = this.bubbleTypes[Math.floor(Math.random() * this.bubbleTypes.length)];
	color = this.type;
	
	var bg = new createjs.Shape();
	bg.graphics.beginFill("white").drawRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
	this.addChild(bg); 
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawCircle(0, 0, this.radius);
	//must explicitly set bounds
	this.setBounds(0,0,this.radius*2,this.radius*2);
	
	this.on("click", this.handleClick);

	this.addChild(this.background); 
	this.mouseChildren = false;
} 

p.handleClick = function (event) 
{    
	var target = event.target;
	if(this.type != "blank")
		checkSmashable(this);
} 


p.updateBubble = function(type)
{
	this.type = type;
	color = this.type;
	
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawCircle(0, 0, this.radius);
	//must explicitly set bounds
	this.setBounds(0,0,this.radius*2,this.radius*2);
	this.addChild(this.background); 

}

window.Bubble = Bubble;
}());