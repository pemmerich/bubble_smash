(function() {

var Button = function(label, color) {
  this.initialize(label, color);
}
var p = Button.prototype = new createjs.Container(); // inherit from Container

p.label;
p.text;
p.background;
p.count = 0;

p.Container_initialize = p.initialize;
p.initialize = function(label, color) {
	this.Container_initialize();
	
	this.label = label;
	if (!color) { color = "#CCC"; }
	
	this.text = new createjs.Text(label, "18px Arial", "#FFF");
	this.text.textBaseline = "top";
	this.text.textAlign = "center";
	
	var width = this.text.getMeasuredWidth()+30;
	var height = this.text.getMeasuredHeight()+20;
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);
	
	this.text.x = width/2;
	this.text.y = 10;
	
	this.addChild(this.background,this.text); 
	

	this.mouseChildren = false;
} 



window.Button = Button;
}());