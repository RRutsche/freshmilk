/**
 * Playlist Model with a name and a list of videos
 * @module models/PlaylistModel		
 */
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