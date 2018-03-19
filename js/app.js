"use strict";

// Enemies our player must avoid
class Enemy {
	constructor(x, y, speed) {
		this.sprite = 'images/enemy-bug.png';
		this.posX = x;
		this.posY = y;
		this.speed = speed;
	}
	// Update the enemy's position
	update() {
		this.posX = this.posX + this.speed;
		if (this.posX > 500) {
			this.posX = 0;
			// "+1" to avoid speed of 0
			this.speed = 1 + Math.floor(Math.random() * Math.floor(4));
		}
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
	}
}

// The Player Class
class Player {
	constructor({
		x = 200,
		y = 400,
		speed = 10
	} = {}) {
		this.sprite = 'images/char-boy.png';
		this.posX = x;
		this.posY = y;
		this.speed = speed;
		this.cheatArray = [];
	}
	// Update the players position
	update() {
		// checks if an enemie touches and kills the player
		for (let bug of allEnemies) {
			if (bug.posX - 85 < this.posX && this.posX < bug.posX + 85) {
				if (bug.posY - 60 < this.posY && this.posY < bug.posY + 75) {
					this.posX = 200;
					this.posY = 400;
				};
			};
		};
		// checks if player reaches the water and wins the game
		if (this.posY <= 0) {
			console.log("WINNNN");
			this.posX = 200;
			this.posY = 400;
		};
		//hidden CHEAT: if 4 times in a row pressed "down": get more speed!!
		if (this.cheatArray[this.cheatArray.length - 1] == "down") {
			if (this.cheatArray[this.cheatArray.length - 2] == "down") {
				if (this.cheatArray[this.cheatArray.length - 3] == "down") {
					if (this.cheatArray[this.cheatArray.length - 4] == "down") {
						console.log("CHEAT AKTIVATED!!");
						this.speed = 50;
					};
				};
			};
		};
	}
	// Draw the player on the screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
	}
	// Inputs are the arrow-key presses. Move the position of the 
	// player and restrict his area to go.
	handleInput(e) {
		switch (e) {
			case "up":
				if (this.posY - this.speed < -30) {
					this.posY = -30;
				} else {
					this.posY -= this.speed;
				};
				break;
			case "down":
				if (this.posY + this.speed > 440) {
					this.posY = 440;
				} else {
					this.posY += this.speed;
				};
				break;
			case "left":
				if (this.posX - this.speed < -10) {
					this.posX = -10;
				} else {
					this.posX -= this.speed;
				};
				break;
			case "right":
				if (this.posX + this.speed > 410) {
					this.posX = 410;
				} else {
					this.posX += this.speed;
				};
				break;
			default:
				console.log("use Left-, Ritht-, Up- and Down-Key to move");
		}
	}	
}

const enemy1 = new Enemy(10, 70, 1);
const enemy2 = new Enemy(10, 150, 2);
const enemy3 = new Enemy(10, 230, 3);

const allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

const player = new Player();

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
	//hidden cheat: if 4 times in a row pressed "down": get more speed!!
	player.cheatArray.push(allowedKeys[e.keyCode]);
});