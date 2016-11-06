// Third party plugins
var _ = require('./plugins/lodash'),
	$ = require('./plugins/jquery'),
	// Mechanics
	events = require('./mechanics/events'),
	// Objects
	Cookie = require('./objects/cookie'),
	data = require('./objects/data'),
	Hero = require('./objects/hero'),
	Item = require('./objects/item'),
	Level = require('./objects/level');

var currentStage,
	levelData,
	selectors = {
		level: '.js-level'
	},
	instances = {};

/**
 * [startLevel description]
 * @param  {[type]} stage [description]
 * @return {[type]}       [description]
 */
function startLevel(stage) {
	levelData = _.find(
		data.levels,
		{ stage: stage }
	);

	var hero = new Hero(
			levelData.hero.image,
			levelData.hero.message
		),
		level = new Level(
			$(selectors.level),
			levelData.level.image
		);

	$.extend(instances, {
		hero: hero,
		level: level
	});

	level.draw();
}

/**
 * [bindEvents description]
 * @return {[type]} [description]
 */
function bindEvents() {
	document.onkeydown = _.partial(events.onKeyDown, instances);
}

/**
 * [init description]
 * @return {[type]} [description]
 */
function init() {
	currentStage = 1;

	startLevel(currentStage);
	bindEvents();
}

init();





