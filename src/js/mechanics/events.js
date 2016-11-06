var __KEYCODES = {
	left: 37,
	right: 39,
	up: 38
};

/**
 * [onKeyDown description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function onKeyDown(instances, e) {
	switch(e.keyCode) {
		case __KEYCODES.left:
			instances.hero.moveLeft();
			break;
		case __KEYCODES.right:
			instances.hero.moveRight();
			break;
		case __KEYCODES.up:
			instances.hero.jump();
			break;
		default:
			return;
	}
}

module.exports = {
	onKeyDown: onKeyDown
};
