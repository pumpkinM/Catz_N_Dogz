// The jQuery library
var $ = require('../plugins/jquery'),
	// Lookup table with different selectors
	selectors = {
		// The form
		form: '.js-form',
		// The player name input
		name: '.js-form-player-name',
		// Submit button
		submit: '.js-form-submit'
	},
	// Cached version of the window object
	$window = $(window),
	// Custom event that will fire
	// when the user clicks the submit button
	// only used for inside this module
	customEvent = 'form-submit';

/**
 * The initialize function
 */
function init() {
	// Create a click event on the submit button
	$(selectors.submit).on('click', function(e) {
		// Prevent default otherwise it will post the form
		e.preventDefault();

		// Get the name value out of the input
		var name = $(selectors.name).val();

		if(name) {
			// Trigger the event that the form has been submitted
			$window.trigger(customEvent);

			// Hide the form
			$(selectors.form).hide();
		}
	});
}

/**
 * Get the name the user has filled in
 */
function getPlayerName() {
	var name = $(selectors.name).val();

	if(name) {
		return name;
	}
}

// Initialize form interaction
init();

/**
 * When a user submits the player name form
 */
function onSubmit(cb) {
	$window.on(customEvent, cb);
}

// What does this module export
module.exports = {
	onSubmit: onSubmit,
	getPlayerName: getPlayerName
};
