// Keycodes used for reference for keyboard events
var __KEYCODES = {
		a: 65,
		d: 68,
		left: 37,
		right: 39,
		spacebar: 32,
		up: 38,
		w: 87
	},
	// Lodash library
	_ = require('../plugins/lodash'),
	// jQuery library
	$ = require('../plugins/jquery'),
	// An array where we keep items that have been hit by the hero
	hitItems = [],
	// Cached version of the window object
	$window = $(window);

/**
 * Check if right key was pressed
 */
function rightKeyPressed(key) {
	if(
		key === __KEYCODES.right ||
		key === __KEYCODES.d
	) {
		return true;
	}

	return false;
}

/**
 * Check if left key was pressed
 */
function leftKeyPressed(key) {
	if(
		key === __KEYCODES.left ||
		key === __KEYCODES.a
	) {
		return true;
	}

	return false;
}

/**
 * Check if jump key was pressed
 */
function jumpKeyPressed(key) {
	if(
		key === __KEYCODES.up ||
		key === __KEYCODES.w ||
		key === __KEYCODES.spacebar
	) {
		return true;
	}

	return false;
}

/**
 * Check hits if there are any
 */
function checkHits(instances, stage) {
	// Get all positions from the items instances
	var positions = _.map(instances.items, function(item) {
			// Only push it to positions if it is a number
			if(typeof item.position === 'number') {
				return item.position;
			}
		}),
		// Get the position of the hero
		heroPos = instances.hero.position + instances.hero.width;

	// Push a new hitItems array if there is none yet
	// for the stage currently being played
	if(hitItems.length < stage) {
		hitItems.push([]);
	}

	// Loop over all positions
	_.each(positions, function(pos, index) {
		// Get the current item in the loop
		var item = instances.items[index],
			// Get the index used for the hitItems
			hitItemIndex = (stage - 1);

		// Check if the hero has passed the item
		// that is currently being looped over.
		// And check if this hit wasn't already previously known.
		if(heroPos >= pos && _.indexOf(hitItems[hitItemIndex], index) === -1) {
			// Add the score to the scorecard
			instances.score.add(item.points);

			// Push it to the hitItems
			hitItems[hitItemIndex].push(index);

			// Remove the item through its instance
			item.remove();

			// If every item has been hit
			if(hitItems[hitItemIndex].length === positions.length) {
				// Trigger the next level after a little while
				setTimeout(function() {
					$window.trigger('next-level', [instances.score.score]);
				}, 500);
			}
		}
	});
}

/**
 * Function used to handle keydown event
 */
function onKeyDown(instances, stage, e) {
	e.preventDefault();

	var key = e.keyCode;

	// If we've pressed the left key
	if(leftKeyPressed(key)) {
		// Make the hero move left
		instances.hero.moveLeft();
		// Make the level move right
		instances.level.moveRight();

		// Loop over all items
		_.each(instances.items, function(item) {
			// and make them move right
			item.moveRight();
		});

		// Check for any hits
		// meaning: has the hero passed an item
		checkHits(instances, stage);

		// Break out of this function
		// we are moving left
		return;
	}

	// If we've pressed the right key
	if(rightKeyPressed(key)) {
		// Move the hero to the right
		instances.hero.moveRight();
		// Move the level to the left
		instances.level.moveLeft();

		// Loop over all items
		_.each(instances.items, function(item) {
			// move them to the left
			item.moveLeft();
		});

		// Check for any hits
		// meaning: has the hero passed an item
		checkHits(instances, stage);

		// Break out of this function
		// we are moving right
		return;
	}

	// If we've pressed the jump key
	if(jumpKeyPressed(key)) {
		// Make the hero jump
		instances.hero.jump();

		// Check if the direction is left
		if(instances.hero.direction === 'left') {
			// And move the level to the right by 60
			instances.level.moveRight(60);

			// Loop over each item
			_.each(instances.items, function(item) {
				// And move them to the right by 60
				item.moveRight(60);
			});
		} else {
			// Otherwise:
			// move the level to the left by 60
			instances.level.moveLeft(60);

			// Loop over each item
			_.each(instances.items, function(item) {
				// And move them to the left by 60
				item.moveLeft(60);
			});
		}

		// Check for any hits
		// meaning: has the hero passed an item
		checkHits(instances, stage);
	}
}

// What does this module export
module.exports = {
	onKeyDown: onKeyDown
};
