// BEST COMMENT EVER

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


//bg img

var bgReady = false;
var bgImg = new Image();
bgImg.onload = function () {
	bgReady = true;
};
bgImg.src = "background.png";

//player
var playerImgReady = false;
var playerImg = new Image();
playerImg.onload = function () {
	playerImgReady = true;
};
playerImg.src = "hero.png";

//Mob
var mobImgReady = false;
var mobImg = new Image();
mobImg.onload = function() {
	mobImgReady = true;
};
mobImg.src = "monster.png";

// Objects
function GameImage(file) {
	this.img = new Image();
	this.img.isReady = false;
	this.ready = false;
	this.img.onload = function() {
		this.isReady = true;
	};

	this.img.src = file;
}

GameImage.prototype.Draw = function(x, y){

	if(this.img.isReady) {
		ctx.drawImage(this.img, x, y);
	}
}

function Player(s, image) {
	this.speed = s;
	this.i = image;
	this.x = 0;
	this.y = 0;

	this.upKey = 38;
	this.downKey = 40;
	this.leftKey = 37;
	this.rightKey = 39;
}

Player.prototype.Draw = function(){
	this.i.Draw(this.x, this.y);
}


Player.prototype.Move = function(mod){
	if (this.upKey in keysDown) { // player holding up
		if(this.y > 32){
			this.y -= this.speed * mod;
		}
	}
	if (this.downKey in keysDown) { // player holding down
		if(this.y < canvas.height - 32 - 32){
			this.y += this.speed * mod;
		}
	}
	if (this.leftKey in keysDown) { // player holding left
		if(this.x > 32){
			this.x -= this.speed * mod;
		}
	}
	if (this.rightKey in keysDown) { // player holding right
		if(this.x < canvas.width - 32 - 32){
			this.x += this.speed * mod;
		}
	}
};

// TEST
testImage = new GameImage("hero.png");
PC = new Player(512, testImage);
PC.x = 50;
PC.y = 50;


//Vars

var player = {
	speed: 256, // movement in pixels per second
	width: 32,
	height: 32,
	x: 50,
	y: 50
};

//var player = new Player(256, playerImg)

var mob = {
	speed: 128,
	x: 0,
	y: 0,
	moving: false
};

var monstersCaught = 0;

// Keyboard handlers
var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

// reset game
var reset = function() {
	player.x = canvas.width / 2;
	player.y = canvas.width / 2;

	mob.x = 32 + (Math.random() * (canvas.width - 96));
	mob.y = 32 + (Math.random() * (canvas.height - 96));
};


//Update
var update = function(modifier){
	if (38 in keysDown) { // player holding up
		if(player.y > 32){
			player.y -= player.speed * modifier;
		}
	}
	if (40 in keysDown) { // player holding down
		if(player.y < canvas.height - 32 - 32){
			player.y += player.speed * modifier;
		}
	}
	if (37 in keysDown) { // player holding left
		if(player.x > 32){
			player.x -= player.speed * modifier;
		}
	}
	if (39 in keysDown) { // player holding right
		if(player.x < canvas.width - 32 - 32){
			player.x += player.speed * modifier;
		}
	}

	// Check for collision
	if (
		player.x <= (mob.x + 32)
		&& mob.x <= (player.x + 32)
		&& player.y <= (mob.y + 32)
		&& mob.y <= (player.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

//Drawing!
var render = function(){
	if(bgReady) {
		ctx.drawImage(bgImg, 0, 0);
	}

	if(playerImgReady) {
		//ctx.drawImage(playerImg, player.x, player.y);
	}

	if(PC.i.img.isReady) {
		PC.Draw();
	}

	if(mobImgReady) {
		ctx.drawImage(mobImg, mob.x, mob.y);
	}

	// score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Mobs Caught: " + monstersCaught, 32, 32);
};

// MAIN LOOP
var main = function() {
	var now = Date.now();
	var delta = now-then;
	
	PC.Move(delta/1000);
	render();

	then = now;	
};

reset();
var then = Date.now();
setInterval(main, 1); //execute as fast as possible

//alert(bgReady);


