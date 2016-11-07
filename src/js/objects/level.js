// The lodash library
var _ = require('../plugins/lodash');

/**
 * Level constructor
 */
function Level($element, image) {
	this.$element = $element;
	this.image = image;
}

Level.prototype = {
	/**
	 * Draw the background
	 */
	drawBackground: function drawBackground() {
		this.$element.css('background-image', 'url(' + this.image + ')');
	},
	/**
	 * Draw the level
	 */
	draw: function draw() {
		this.drawBackground();

		// Set the background-position-x to 0
		// to start at a correct frame
		this.$element.css('background-position-x', 0);
	},
	/**
	 * Move the level
	 */
	move: function move(distance) {
		//  Get the previous background-position-x
		var bgPos = parseInt(this.$element.css('background-position-x'), 10),
			// And add the provided distance to it
			newBgPos = bgPos + distance;

		// Set this as the new background-position-x
		this.$element.css('background-position-x', newBgPos + 'px')
	},
	/**
	 * Move to the right
	 */
	moveRight: function moveRight(distance) {
		var movement = distance || 20;

		this.move(movement);
	},
	/**
	 * Move to the left
	 */
	moveLeft: function moveLeft(distance) {
		var movement = distance || 20

		// Adding a negative number is subtracting
		this.move(-(movement));
	}
}

// Export Level constructor
module.exports = Level;
