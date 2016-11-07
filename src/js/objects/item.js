// jQuery library
var $ = require('../plugins/jquery'),
	// Lodash library
	_ = require('../plugins/lodash'),
	// Lookup table with selectors
	selectors = {
		items: '.js-items'
	},
	// Classname used on items
	itemClass = 'item';

/**
 * Item constructor
 */
function Item(image, points, position, offset) {
	this.url = image.url;
	this.width = image.width;
	this.height = image.height;
	this.position = position;
	this.points = points;
	this.offset = offset;
	// Create a new div as $element
	this.$element = $('<div />');

	// When the item gets constructed
	// it is also instantly rendered
	this.render();
}

Item.prototype = {
	/**
	 * Render an item
	 */
	render: function render() {
		this.$element
			// Add the item class for some extra styling
			.addClass(itemClass)
			// Set the needed CSS
			.css({
				backgroundImage: 'url(' + this.url + ')',
				backgroundSize: this.width + 'px' + ' ' + this.height + 'px',
				width: this.width,
				height: this.height,
				bottom: this.offset,
				left: this.position
			});

		// Append this item to the set of items
		$(selectors.items).append(this.$element);
	},
	/**
	 * Remove an item
	 */
	remove: function() {
		// Remove the element from the DOM
		this.$element.remove();
		// Set the position of the instance to null
		this.position = null;
	},
	/**
	 * Move the item to the right
	 */
	moveRight: function moveRight(distance) {
		var left = _.parseInt(this.$element.css('left')),
			movement = distance || 20;

		// Set its position to its previous left position
		// plus a single tick of movement
		this.position = (left + movement);
		this.$element.css('left', this.position + 'px');
	},
	/**
	 * Move the item to the left
	 */
	moveLeft: function moveLeft(distance) {
		var left = _.parseInt(this.$element.css('left')),
			movement = distance || 20;

		// Set its position to its previous left position
		// minus a single tick of movement
		this.position = (left - movement);
		this.$element.css('left', this.position + 'px');
	}
}

// Export Item constructor
module.exports = Item;
