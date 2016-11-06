function Level($element, image) {
	this.$element = $element;
	this.image = image;
}

Level.prototype.draw = function() {
	this.$element.css('background-image', 'url(' + this.image+ ')');
}

module.exports = Level;
