var stage, holder;
var smashTimer;
var mode = "standard";
var level = 0;
var levels = [
              ["#0099cc","#ff6600"],
              ["#0099cc","#ff6600","#0fad00"],
              ["#0099cc","#ff6600","#0fad00","#6300a5"],
              ["#0099cc","#ff6600","#0fad00","#6300a5","#ffff00"],
              ["#0099cc","#ff6600","#0fad00","#6300a5","#ffff00","#0010a5"]
              ];
var modeBtn;
var gameOverLabel;

function init() 
{
	//console.log("init");
	stage = new createjs.Stage("bubbleCanvas");
	createjs.Touch.enable(stage);

	/*
	var ctx = document.getElementById("bubbleCanvas");
	ctx.width  = window.innerWidth;
	ctx.height = window.innerHeight;
	*/
	
	var resetBtn = stage.addChild(new Button("Reset Board", "#0099cc"));
	resetBtn.x = 5;
	resetBtn.y = 475;
	resetBtn.on("click", reset);
	
	var quitBtn = stage.addChild(new Button("New Game", "#0099cc"));
	quitBtn.x = 150;
	quitBtn.y = 475;
	quitBtn.on("click", quit);
	
	modeBtn = stage.addChild(new Button("Standard", "#0099cc"));
	modeBtn.x = 285;
	modeBtn.y = 475;
	modeBtn.on("click", changeMode);
	
	gameOverLabel = new createjs.Text("", "18px Arial", "#000");
	gameOverLabel.textBaseline = "top";
	gameOverLabel.textAlign = "center";
	
	var width = stage.canvas.width;
	var height = gameOverLabel.getMeasuredHeight()+20;
	
	gameOverLabel.x = width/2;
	gameOverLabel.y = 100;
	
	stage.addChild(gameOverLabel);
	
	
	loadLevel(level);
	
	
	createjs.Ticker.on("tick", stage);
}

function checkSmashable(bubble)
{
	//console.log("check smashable");
	
	
	var row = bubble.row;
	var column = bubble.column;
	var type = bubble.type;
	var count = 0;
	
	var up = stage.getChildByName("bubble_"+column+"_"+(row-1));
	try{
		if(up.type == type){
			count++;
			
		}
	}catch(e){}
	
	//down
	var down = stage.getChildByName("bubble_"+column+"_"+(row+1));
	try{
		if(down.type == type){
			count++;
			
		}
	}catch(e){};
	
	//left
	var left = stage.getChildByName("bubble_"+(column-1)+"_"+row);
	try{
		if(left.type == type){
			count++;
			
		}
	}catch(e){}
	
	//right
	var right = stage.getChildByName("bubble_"+(column+1)+"_"+row);
	try{
		if(right.type == type){
			count++;
			
		}
	}catch(e){}
	
	if(count>0){
		
		smashBubble(bubble);
	}
}

function smashBubble(bubble)
{
	//console.log("smash bubble");
	window.clearTimeout(smashTimer);
	smashTimer = setTimeout(cleanUpBubbles, 100);
	
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
	//console.log("clean up bubbles");
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
	setTimeout(cleanUpBubblesHorizontal, 200);
	//cleanUpBubblesHorizontal();
	
}

function cleanUpBubblesHorizontal()
{
	//console.log("clean up bubbles horizontal");
	if(mode=="shifter"){
		for(var q=0; q<11; q++){
			for (var i=0; i<11; i++){
				for (var n=0; n<10; n++){
					var bubble = stage.getChildByName("bubble_"+n+"_"+i);
					if(bubble.type != "blank"){
						var left = stage.getChildByName("bubble_"+(n-1)+"_"+i);
						try{
							if(left.type == "blank"){
								left.updateBubble(bubble.type);
								bubble.type="blank";
								bubble.removeChild(bubble.background);
						}
						}catch(e){};
					}
				}
			}
		}
	}else if(mode=="standard"){
		//console.log("standard mode");
		for(var q=0; q<10; q++){
			for(var n=0; n<10; n++){
			
				var bottomBubble = stage.getChildByName("bubble_"+n+"_"+(11-1));
				//console.log("bottom bubble = "+bottomBubble.name+" type = "+bottomBubble.type);
			
				try{	
					var bottomLeft = stage.getChildByName("bubble_"+(n-1)+"_"+(11-1));
					//console.log("bottom bubble left = "+bottomLeft.name+" type = "+bottomLeft.type);

					if(bottomBubble.type!="blank" && bottomLeft.type=="blank"){
						//console.log("standard shift "+bottomBubble.name);
						for (var i=0; i<11; i++){
							var bubble = stage.getChildByName("bubble_"+n+"_"+i);
							if(bubble.type != "blank"){
								var left = stage.getChildByName("bubble_"+(n-1)+"_"+i);
								try{
									if(left.type == "blank"){
										left.updateBubble(bubble.type);
										bubble.type="blank";
										bubble.removeChild(bubble.background);
									}
								}catch(e){};
							}
						}
					}
				}catch(e){}
			}
		}
	}
	
	var status = checkStatus();
	if(status[0] >= 10*11){
		//console.log("game over blanks = "+status[0]+" connections = "+status[1]+" - win");
		if(level < levels.length-1){
			//console.log("next level");
			level++;
			loadLevel(level);
		}else{
			gameOverLabel.text = "ALL LEVELS COMPLETE! YOU WIN!";
		}
	}else if(status[1] == 0){
		//console.log("game over blanks = "+status[0]+" connections = "+status[1]+" - fail");
		gameOverLabel.text = "GAME OVER";
	}
}

function checkStatus()
{
	var connections=0;
	var blanks=0;
	var returnArray;
	
	for (var i=0; i<11; i++){
		for (var n=0; n<10; n++){
			var bubble = stage.getChildByName("bubble_"+n+"_"+i);
			if(bubble.type != "blank"){
				var up = stage.getChildByName("bubble_"+n+"_"+(i-1));
				try{
					if(up.type == bubble.type){
						connections++;
					}
				}catch(e){}
				
				//down
				var down = stage.getChildByName("bubble_"+n+"_"+(i+1));
				try{
					if(down.type == bubble.type){
						connections++;
					}
				}catch(e){};
				
				//left
				var left = stage.getChildByName("bubble_"+(n-1)+"_"+i);
				try{
					if(left.type == bubble.type){
						connections++;
					}
				}catch(e){}
				
				//right
				var right = stage.getChildByName("bubble_"+(n+1)+"_"+i);
				try{
					if(right.type == bubble.type){
						connections++;
					}
				}catch(e){}
			}else{
				blanks++;
			}
		}
	}
	
	returnArray = [blanks,connections];
	return returnArray;
	
}


function reset()
{
	//console.log("reset");
	loadLevel(level);
}

function quit()
{
	//console.log("quit");
	level=0;
	loadLevel(level);
}

function changeMode()
{
	if(mode=="standard"){
		mode="shifter";
		modeBtn.text.text ="Shifter";
	}else{
		mode="standard";
		modeBtn.text.text = "Standard";
	}
}

function loadLevel(level)
{
	gameOverLabel.text = "";
	for (var i=0; i<11; i++){
		for (var n=0; n<10; n++){
			var bubble = stage.getChildByName("bubble_"+n+"_"+i);
			stage.removeChildAt(stage.getChildIndex(bubble));
		}
	}
	for (var i=0; i<11; i++){
		for (var n=0; n<10; n++){
			var bubble = new Bubble(20, levels[level]);
			bubble.row=i;
			bubble.column=n;
			bubble.name = "bubble_"+n+"_"+i;
			stage.addChild(bubble);
			bubble.x = (n*bubble.radius*2)+bubble.radius;
			bubble.y = (i*bubble.radius*2)+bubble.radius+6; 
		}
	}	
	stage.setChildIndex(gameOverLabel,stage.getNumChildren()-1);
}