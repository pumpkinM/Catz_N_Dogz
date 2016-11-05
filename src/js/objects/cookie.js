var Item = require('./item');

function Cookie(flavour) {
	if(flavour === 'nasty') {
		return new Item('nasty cookie', -5);
	}

	if(flavour === 'nice') {
		return new Item('nice cookie', 5);
	}

	return null;
}

module.exports = Cookie;
