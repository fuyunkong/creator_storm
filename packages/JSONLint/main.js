'use strict';

module.exports = {
	load() {
		Editor.log('package load');
	},

	unload() {
		Editor.log('package unload');
	},

	messages: {
		'open' () {
			Editor.Panel.open('json-lint');
		}
	},
};