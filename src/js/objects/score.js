// Lookup table with selectors
var selectors = {
		amount: '.js-score-amount',
		name: '.js-score-name'
	},
	// Suffix used behind the points
	scoreSuffix = ' points';

/**
 * Score constructor
 */
function Score($element, name, score) {
	this.$element = $element;
	this.$name = $element.find(selectors.name);
	this.$amount = $element.find(selectors.amount);
	this.name = name;
	this.score = score;

	// Scorecard will get instantly rendered
	// on instantiation
	this.render();
}

Score.prototype = {
	/**
	 * Add to the score
	 */
	add: function add(amount) {
		this.score = this.score + amount;
		// Make sure to update rendering
		this.update();
	},
	/**
	 * Subtract from the score
	 */
	subtract: function subtract(amount) {
		this.score = this.score - amount;
		// Make sure to update rendering
		this.update();
	},
	render: function render() {
		// Render the name
		this.$name.html(this.name);
		// Render the amount
		this.$amount.html(this.score + scoreSuffix);
	},
	update: function update() {
		this.$amount.html(this.score + scoreSuffix);
	}
};

// Export Score constructor
module.exports = Score;
