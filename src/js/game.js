// Third party plugins
var _ = require('./plugins/lodash'),
	$ = require('./plugins/jquery'),
	// Mechanics
	events = require('./mechanics/events'),
	form = require('./mechanics/form'),
	// Objects
	Hero = require('./objects/hero'),
	Item = require('./objects/item'),
	Level = require('./objects/level'),
	Score = require('./objects/score');

// Current stage we're on
var currentStage = 1,
	// Placeholder for the data
	// loaded via AJAX
	data,
	// Lookup table with selectors
	selectors = {
		game: '.js-game',
		hero: '.js-hero',
		level: '.js-level',
		score: '.js-score'
	},
	// Placeholder for any object instances we're going to create
	instances = {},
	// The URL used for the AJAX request
	levelUrl = './dist/data/levels.json',
	// A plain version of the games HTML
	// used when a new level gets initialized
	plainLevelHtml = $(selectors.game).html(),
	// Cached version of the window object
	$window = $(window);

/**
 * Game object constructor
 */
function Game(stage, score, $element) {
	var context = this;

	context.stage = stage;
	context.score = score;

	// Get a specific set of data
	// based on the current level
	context.data = context.getLevelData();

	context.hero = new Hero(
		$(selectors.hero),
		context.data.hero.image,
		context.data.hero.message,
		context.data.level.bottomOffset
	);

	context.level = new Level(
		$(selectors.level),
		context.data.level.image
	);

	context.score = new Score(
		$(selectors.score),
		form.getPlayerName(),
		context.score
	);

	// Map over all items in the data
	context.items = _.map(
		context.data.items,
		// Use the Game.spawnItems method
		// and give it its first argument,
		// which is the level's bottom offset
		_.partial(
			context.spawnItem,
			context.data.level.bottomOffset
		)
	);

	// Wait for the intro and then bind events
	setTimeout(function() {
		context.bindEvents();
	}, 2000);
}

Game.prototype = {
	/**
	 * Spawn the items into the game
	 */
	spawnItem: function spawnItem(offset, item) {
		return new Item(
			item.image,
			item.points,
			item.position,
			offset
		);
	},
	/**
	 * Get specific data based on the level
	 */
	getLevelData: function getLevelData() {
		return _.find(
			// Look inside data.levels
			data.levels,
			// And find a set where the stage
			// is equal to the current stage
			{
				stage: this.stage
			}
		);
	},
	/**
	 * Start the game
	 */
	render: function render() {
		this.level.draw();
		this.hero.draw();
	},
	/**
	 * Bind events
	 */
	bindEvents: function bindEvents() {
		var context = this;

		// Bind a click event on the hero
		$(selectors.hero).on('click', function() {
			// Make the hero speak
			context.hero.speak();
		});

		// Bind the keydown event
		// use _.partial to pass in the instances
		// needed to fulfill the events functionality
		document.onkeydown = _.partial(
			events.onKeyDown,
			{
				hero: this.hero,
				level: this.level,
				items: this.items,
				score: this.score
			},
			currentStage
		);
	}
};

/**
 * Start game
 */
function startGame(stage, score) {
	// Reset game's HTML
	$(selectors.game).html(plainLevelHtml);

	// Your hero has arrived!
	setTimeout(function() {
		alert('Welcome to level ' + stage + ', your hero has arrived!');
	}, 50);

	// Create a new game instance
	var game = new Game(stage, score);

	// Render the game
	game.render();
}

/**
 * When the form gets submitted
 */
form.onSubmit(function() {
	// Show the game
	$(selectors.game).removeClass('hidden');

	alert(
		'Hey '+ form.getPlayerName() + ', Welcome to the world of Catz \'N Dogz!' +
		' You can use the arrow keys, wasd, and the spacebar to navigate. ' +
		'Catch all pieces of candy to complete your quest!'
	);

	// Start the game
	startGame(currentStage, 0);

	// When the window gets a signal
	// that it needs to start a new level
	$window.on('next-level', function(e, score) {
		// Up the current stage by 1
		currentStage++;

		// Is the current stage equal to or less than the amount of levels
		if(currentStage <= data.levels.length) {
			// Start a game with the new stage
			startGame(currentStage, score);
		} else {
			// Congrats, you're done!
			setTimeout(function() {
				alert(
					'You\'ve collected all items and made the Catz \'N Dogz very happy.' +
					' Thanks for playing, ' + form.getPlayerName() + '!'
				);
			}, 500);
		}
	});
});

// Get the levels from the server
$.get(levelUrl).done(function(resp) {
	data = resp;
});









