/**
 * Video Model with properties matching the freshmilk video data structure
 * @module models/VideoModel		
 */
var Backbone = require('backbone');

var VideoModel = Backbone.Model.extend({

	defaults: function() {
		return {
			id: null, 
			additional_id: "",
			modified: "",
			title: "",
			locator: "",
			active: true,
			language: null,
			rating: null,
			collection: null,
			copyright: null,
			policy: null,
			contributors: [],
			genre: [],
			target_audience: [],
			target_region: [],
			publisher: [{
				id: null,
				name: ""
			}]
		};
	}
});

module.exports = VideoModel;
