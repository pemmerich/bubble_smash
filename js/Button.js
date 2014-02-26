(function() {

var Button = function(label, color, fontSizeType) {
  this.initialize(label, color, fontSizeType);
}
var p = Button.prototype = new createjs.Container(); // inherit from Container

p.label;
p.text;
p.background;
p.count = 0;
p.width;
p.height;

p.Container_initialize = p.initialize;
p.initialize = function(label, color, fontSizeType) {
	this.Container_initialize();
	if(!fontSizeType)
		fontSizeType = "18px Arial";
	
	this.label = label;
	if (!color) { color = "#CCC"; }
	
	this.text = new createjs.Text(label, fontSizeType, "#FFF");
	this.text.textBaseline = "top";
	this.text.textAlign = "center";
	
	this.width = this.text.getMeasuredWidth()+30;
	this.height = this.text.getMeasuredHeight()+20;
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawRoundRect(0,0,this.width,this.height,10);
	
	this.text.x = this.width/2;
	this.text.y = 10;
	
	this.addChild(this.background,this.text); 
	

	this.mouseChildren = false;
} 



window.Button = Button;
}());