(function() {

var Bubble = function(radius,types) {
  this.initialize(radius,types);
}
var p = Bubble.prototype = new createjs.Container(); // inherit from Container
p.background;
p.count = 0;
//p.bubbleTypes = ["#ff0000","#3366ff"];
p.bubbleTypes = ["images/blue.png","images/orange.png"];
p.type;
p.radius = 15;
p.imgWidth = 75;
p.row;
p.column;
p.startX;
p.endX;
p.offset;
p.originalX;

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
	//bg.graphics.beginFill("red").drawRect(-this.radius, -this.radius, this.radius*2, this.radius*2);
	//this.addChild(bg); 
	
	/*
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawCircle(0, 0, this.radius);
	*/
	this.background = new createjs.Bitmap(color);
	this.addChild(this.background); 
	//set size of image
	

	var scale = (this.radius*2)/this.imgWidth;

	this.background.scaleX = this.background.scaleY = scale;
	this.background.regX = this.background.regY = this.radius;
	
	//must explicitly set bounds
	this.setBounds(0,0,this.radius*2,this.radius*2);
	
	//this.on("click", this.handleClick);
	
	this.on("mousedown", this.handleMouseDown);
	this.on("pressup", this.handlePressUp);
	this.on("pressmove", this.handlePressMove);

	
	this.mouseChildren = false;
	
} 

p.handleClick = function (event) 
{    
	var target = event.target;
	if(this.type != "blank")
		checkSmashable(this);
} 

p.handleMouseDown = function (event)
{
	//console.log("press down "+event.stageX);
	this.startX = event.stageX;
	this.offset = {x:this.background.x-event.stageX, y:this.background.y-event.stageY};
	this.originalX = this.background.x;
	stage.setChildIndex(this,stage.getNumChildren()-1);
}

p.handlePressMove = function (event) 
{    
	//console.log("press move "+event.stageX);
	this.endX = event.stageX;
	var diff = this.startX-this.endX;
	if(Math.abs(diff)<this.radius*2){
		this.background.x = event.stageX + this.offset.x;
	}else{
		try{
			this.background.x = (this.original.x + this.radius*2)*(diff/diff);
		}catch(e){}
	}
	
}

p.handlePressUp = function (event) 
{    
	console.log("press up "+event.stageX+" type = "+this.type);
	this.endX = event.stageX;
	var diff = this.startX-this.endX;
	//console.log("diff = "+diff);
	if(Math.abs(diff)<this.radius){
		if(this.type != "blank")
			checkSmashable(this);
	}else{
		swapBubble(this,diff);
	}
}



p.updateBubble = function(type)
{
	this.type = type;
	color = this.type;
	this.removeChild(this.background);
	if(type!="blank"){
		/*
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(color).drawCircle(0, 0, this.radius);
		*/
		this.background = new createjs.Bitmap(color);

		var scale = (this.radius*2)/this.imgWidth;
		this.background.scaleX = this.background.scaleY = scale;
		this.background.regX = this.background.regY = this.radius;
		//must explicitly set bounds
		this.setBounds(0,0,this.radius*2,this.radius*2);
		this.addChild(this.background); 
	}

}

window.Bubble = Bubble;
}());