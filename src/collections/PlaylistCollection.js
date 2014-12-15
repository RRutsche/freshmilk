/**
 * Represents a collection of playlists
 * @module collections/PlaylistCollection
 */
var Backbone = require('backbone');
var PlaylistModel = require('../models/PlaylistModel');

var PlaylistCollection = Backbone.Collection.extend({

	model: PlaylistModel,

	filterName: function(name) {
		filtered = this.filter(function(playlist) {
			return playlist.get('name').indexOf(name) !== -1;
		});
		return new PlaylistCollection(filtered);
	}
});

module.exports = PlaylistCollection;