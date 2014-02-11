var stage, holder;
var smashTimer;

function init() 
{
	console.log("init");
	stage = new createjs.Stage("bubbleCanvas");
	createjs.Touch.enable(stage);

	for (var i=0; i<11; i++){
		for (var n=0; n<10; n++){
			var bubble = new Bubble(20);
			bubble.row=i;
			bubble.column=n;
			bubble.name = "bubble_"+n+"_"+i;
			stage.addChild(bubble);
			bubble.x = (n*bubble.radius*2)+bubble.radius;
			bubble.y = (i*bubble.radius*2)+bubble.radius+6; 
		}
	}
	
	createjs.Ticker.on("tick", stage);
}

function smashBubble(bubble)
{
	window.clearTimeout(smashTimer);
	smashTimer = setTimeout(cleanUpBubbles, 100);
	console.log("name = "+bubble.name);
	bubble.removeChild(bubble.background);
	var row = bubble.row;
	var column = bubble.column;
	var type = bubble.type;
	var count = 0;
	
	bubble.type = "blank";
	//check surrounding bubbles
	//up
	var up = stage.getChildByName("bubble_"+column+"_"+(row-1));
	try{
		if(up.type == type){
			smashBubble(up);
		}
	}catch(e){}
	
	//down
	var down = stage.getChildByName("bubble_"+column+"_"+(row+1));
	try{
		if(down.type == type){
			smashBubble(down);
		}
	}catch(e){};
	
	//left
	var left = stage.getChildByName("bubble_"+(column-1)+"_"+row);
	try{
		if(left.type == type){
			smashBubble(left);
		}
	}catch(e){}
	
	//right
	var right = stage.getChildByName("bubble_"+(column+1)+"_"+row);
	try{
		if(right.type == type){
			smashBubble(right);
		}
	}catch(e){}
}

function cleanUpBubbles()
{
	console.log("clean up bubbles");
	for(var q=0; q<11; q++){
		for (var i=0; i<11; i++){
			for (var n=0; n<10; n++){
				var bubble = stage.getChildByName("bubble_"+n+"_"+i);
				if(bubble.type != "blank"){
					var down = stage.getChildByName("bubble_"+n+"_"+(i+1));
					try{
						if(down.type == "blank"){
							down.updateBubble(bubble.type);
							bubble.type="blank";
							bubble.removeChild(bubble.background);
						}
					}catch(e){};
				}
			}
		}
	}
}