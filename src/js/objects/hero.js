var _ = require('../plugins/lodash');

// Lookup table for classnames used
var classNames = {
		// Classname used to disable transition
		disableTransition: 'disable-transition',
		// Classname to flip the character horizontally
		left: 'left',
		// Classname to rotate the character slightly
		rotate: 'rotate'
	},
	// The width of a hero
	heroWidth = 65,
	// The spritesheet contains three frames
	sourceImageWidth = (heroWidth * 3);

/**
 * Hero constructor
 */
function Hero($element, imageUrl, message, offset) {
	// Element from the DOM
	this.$element = $element;
	// The image url of the spritesheet
	this.imageUrl = imageUrl;
	// A message displayed when clicking the hero
	this.message = message;
	// The bottom offset of the hero
	this.offset = offset;
	// The default direction is set to right
	this.direction = 'right';
	// The width of the hero
	this.width = heroWidth;
	// The position of the hero
	this.position = 0;

	// When a hero gets instantiated
	// it is instantly drawn on the screen
	this.draw();
}

Hero.prototype = {
	/**
	 * Method to make the hero jump
	 */
	jump: function jump() {
		// Reference to the context
		// handy to use when scope is changed (for example setTimeout)
		var context = this,
			// The hero element (in jQuery)
			$el = context.$element,
			// The amount for the hero to move
			// uses a ternary operator to determine the direction of the hero
			moveAmount = (context.direction === 'left') ? -100 : 100,
			// The height the hero will jump in pixels
			jumpHeight = 100,
			// The amount of time the hero stays in the air
			airTime = 250;

		// Set the bottom of the hero to the right height
		// a CSS transition will take care of the rest
		$el.css({
			bottom: (context.offset + jumpHeight) + 'px'
			// Add a rotate classname to tilt it slightly
		}).addClass(classNames.rotate);

		// Move the hero by the determined amount
		context.move(moveAmount);

		// Wait a while
		setTimeout(function() {
			// And then reset the bottom offset
			$el.css({
				bottom: context.offset + 'px'
			});

			// Set the hero to a straight position again
			$el.removeClass(classNames.rotate);

			// And move it forward slightly again to create a landing
			context.move(moveAmount);
		}, airTime);
	},
	/**
	 * Check the position of the hero
	 */
	checkPosition: function checkPosition(position) {
		// If the hero has passed the beginning
		if(position < 1) {
			// Keep the hero pushing up against the screen
			position = 1;
		}

		// If the hero has passed the end
		if(position > window.outerWidth) {
			// Let the hero re-appear on the other side of the screen
			position = -(heroWidth);

			// Add a class to disable transitions
			// otherwise the hero will animate through the entire screen
			this.$element.addClass(classNames.disableTransition)
		}

		return position;
	},
	/**
	 * Make the hero move
	 */
	move: function move(distance) {
		var $el = this.$element,
			// Get the previous left position
			leftPos = parseInt($el.css('left'), 10),
			// Calculate the new position
			newPos = this.checkPosition(leftPos + distance);

		// Set the new position
		$el.css('left', newPos + 'px');
		this.position = newPos;

		// Wait a while and remove the disable transition class
		setTimeout(function() {
			$el.removeClass(classNames.disableTransition)
		}, 200);
	},
	/**
	 * Create the illusion that the hero is walking
	 */
	walkAnimation: function walkAnimation() {
		// Get the current background-position-x
		var bgPosX = parseInt(this.$element.css('background-position-x'), 10),
			// Calculate the next position in the sprite sheet
			newPos = (bgPosX - heroWidth) % sourceImageWidth;

		// Set the next position
		this.$element.css('background-position-x', newPos);
	},
	moveLeft: function moveLeft() {
		// Set the direction to left
		this.direction = 'left';
		// Move by -10px
		this.move(-10);
		// Add the left class
		// we use this to horizontally flip the hero
		this.$element.addClass(classNames.left);
		// Perform walk animation
		this.walkAnimation();
	},
	moveRight: function moveRight() {
		// Set the direction to right
		this.direction = 'right';
		// Move by 10px
		this.move(10);
		// Remove the left class
		// we use this to horizontally flip the hero
		this.$element.removeClass(classNames.left);
		// Perform walk animation
		this.walkAnimation();
	},
	/**
	 * Make the hero speak
	 */
	speak: function speak() {
		alert('Your hero says ' + this.message);
	},
	/**
	 * Draw the hero on the screen
	 */
	draw: function draw() {
		var context = this,
			$el = this.$element;

	 	$el.css({
	 		// Set the background image to the correct url
	 		backgroundImage: 'url(' + this.imageUrl + ')',
	 		// Put it outside of the screen
	 		left: -80,
	 		// Set the correct bottom offset
	 		bottom: this.offset
	 	});

	 	// Wait a while
	 	setTimeout(function() {
	 		// And then animate the hero into the screen
	 		$el.css('left', '40px');

	 		// Make to set the position in the context aswell
	 		context.position = 40;
	 	}, 1000);
	}
};

// Export Hero constructor
module.exports = Hero;
