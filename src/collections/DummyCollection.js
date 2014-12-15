/**
 * Represents the collection of videos in the video slider
 * @module collections/DummyCollection
 */
var Backbone = require('backbone');
var DateJs = require('datejs');
var Video = require('../models/VideoModel');

var DummyCollection = Backbone.Collection.extend({
	
	model: Video,

	comparator: function(item) {
        return item.get('title').toLowerCase();
    }
});

module.exports = DummyCollection;
