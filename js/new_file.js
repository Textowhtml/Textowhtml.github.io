//点击开始游戏--> startpage消失-->游戏开始
//随机出现食物,出现三节蛇运动
//按上下左右-->改变方向运动
//判断是否吃到食物-->食物消失,蛇的长度+1
//判断游戏结束,弹出框

var startP = document.getElementById('startP');
var startPage = document.getElementById('startPage');
var lose = document.getElementById('lose');
var scoreBox = document.getElementById("score");
var content =  document.getElementById('content');
var startPage = document.getElementById('startPage');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close')
var startbtn = document.getElementById('startbtn');
var snakeMove;
var	startGameBool = true;
var	startPaushBool = true;
var speed = 200;
init();  
function init(){
	//地图
	this.mapW = parseInt(getComputedStyle(content).width); 
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakebody = [[4,3,'head'],[3,3,'body'],[2,3,'body']];
	// this.snakebody = [[5,3,'head'],[4,3,'body'],[3,3,'body']];
	//游戏属性
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	
	bindEvent();
}

function startGame(){
	startPage.style.display = 'none';
	startP.style.display = 'block';
	food();
	snake();
	bindEvent();
}

function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor( Math.random() *(this.mapW/ 20));
	this.foodY = Math.floor( Math.random() *(this.mapH/ 20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class','food')
}

function snake(){
	for(var i = 0; i< this.snakebody.length; i++){
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakebody[i][0] * 20 + 'px';
		snake.style.top = this.snakebody[i][1] * 20 + 'px';
		snake.classList.add(this.snakebody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch(this.direct){
			case 'right':
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)'
				break;
			case 'left':
				snake.style.transform = 'rotate(180deg)'
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)'
				break;
				default:
			break;
		}
	}
}

function move(){
	for(var i = this.snakebody.length - 1; i> 0;i--){
		this.snakebody[i][0] = this.snakebody[i - 1][0];
		this.snakebody[i][1] = this.snakebody[i - 1][1];
	}
	switch(this.direct){
		case 'right':
			this.snakebody[0][0] += 1;
			break;
		case 'up':
			this.snakebody[0][1] -= 1;
			break;
		case 'left':
			this.snakebody[0][0] -= 1;
			break;
		case 'down':
			this.snakebody[0][1] += 1;
			break;
			default:
		break;
	}
	removeClass('snake');
	snake();
	if(this.snakebody[0][0] == this.foodX && this.snakebody[0][1] == this.foodY){
		var snakeEndX = this.snakebody[this.snakebody.length - 1][0];
		var snakeEndY = this.snakebody[this.snakebody.length - 1][1];
		switch(this.direct){
			case 'right':
				this.snakebody.push([snakeEndX + 1,snakeEndY,'body'])
				break;
			case 'up':
				this.snakebody.push([snakeEndX,snakeEndY - 1,'body'])
				break;
			case 'left':
				this.snakebody.push([snakeEndX - 1,snakeEndY,'body'])
				break;
			case 'down':
				this.snakebody.push([snakeEndX,snakeEndY + 1,'body'])
				break;
				default:
			break;
		}
		this.score += 1;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
	}
	if(this.snakebody[0][0] < 0 || this.snakebody[0][0] >= this.mapW/20){
		relogGame();
	}
	if(this.snakebody[0][1] < 0 || this.snakebody[0][1] >= this.mapH/20){
		relogGame();
	}
	var snakeHX = this.snakebody[0][0];
	var snakeHY = this.snakebody[0][1];
	for(var i  = 1; i < this.snakebody.length; i ++){
		if(snakeHX == snakebody[i][0] && snakeHY == snakebody[i][1]){
			relogGame();
		}
	}
}

function relogGame(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakebody = [[4,3,'head'],[3,3,'body'],[2,3,'body']];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	
	lose.style.display = 'block';
	loserScore.innerHTML = this.score;
	this.score = 0;
	scoreBox.innerHTML = this.score;
	startGameBool = true;
	startPaushBool = true;
	startP.setAttribute('src','./img/播放.png');
	
}


function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length>0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}

function setDerict(code){
	switch(code){
		case 37:
			if(this.left){
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if(this.up){
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if(this.right){
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if(this.down){
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;	
	}
}

function bindEvent(){
	close.onclick = function(){
		lose.style.display = 'none';
		console.log(111)
	}
	
	startbtn.onclick = function(){
		console.log(222)
		startAndPaush();
	}
	
	startP.onclick = function(){
		console.log(333)
		startAndPaush();
	}
}

function startAndPaush(){
	if(startPaushBool){
		if(startGameBool){
			startGame();
			startGameBool = false;
		}
		
		startP.setAttribute('src','./img/暂停.png');
		document.onkeydown = function(e){
			var code =  e.keyCode
			setDerict(code);
		}
		snakeMove = setInterval(function(){
			move()
		},speed);
		startPaushBool = false;
	}else{
		startP.setAttribute('src','./img/播放.png');
		clearInterval(snakeMove);
		document.onkeydown = function(e){
			e.returnValue = false;
			return false;
		};
		startPaushBool = true;
	}
}