var Backbone = require('backbone');

var PlaylistModel = Backbone.Model.extend({

	defaults: function() {
		return {
			name: 'unnamed',
			videos: []
		};
	}
});

module.exports = PlaylistModel;