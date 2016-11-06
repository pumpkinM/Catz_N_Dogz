function Hero(image, message) {
	this.image = image;
	this.message = message;
}

Hero.prototype = {
	jump: function jump() {
		console.log('Currently: jump');
	},
	moveLeft: function moveLeft() {
		console.log('Currently: moveLeft');
	},
	moveRight: function moveRight() {
		console.log('Currently: moveRight');
	},
	speak: function speak() {
		return this.message;
	}
};

module.exports = Hero;
