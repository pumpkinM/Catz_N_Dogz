var _ = require('./plugins/lodash'),
	$ = require('./plugins/jquery'),
	Cookie = require('./objects/cookie'),
	data = require('./objects/data'),
	Hero = require('./objects/hero'),
	Item = require('./objects/item'),
	Level = require('./objects/level');

var currentStage = 1;

alert('Welcome to level ' + currentStage);
