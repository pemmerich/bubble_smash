var stage, holder;


function init() 
{
	console.log("init");
	stage = new createjs.Stage("bubbleCanvas");
	createjs.Touch.enable(stage);

	for (var i=0; i<11; i++){
		for (var n=0; n<10; n++){
			var bubble = new Bubble(20);
			stage.addChild(bubble);
			bubble.x = (n*bubble.radius*2)+bubble.radius;
			bubble.y = (i*bubble.radius*2)+bubble.radius+6; 
		}
	}
	
	createjs.Ticker.on("tick", stage);
}

