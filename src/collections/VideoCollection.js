/**
 * Represents the collection of videos fetched from the freshmilk api
 * @module collections/VideoCollection
 */
var Backbone = require('backbone');
var DateJs = require('datejs');
var Video = require('../models/VideoModel');

var VideoCollection = Backbone.Collection.extend({
	
	model: Video,
	url : "../assets/api.json",

	comparator: function(item) {
        return item.get('title').toLowerCase();
    },

    /**
     * Returns a filtered collection depending on the given search criterias
     * @param  {String} searchString    searchfield input
     * @param  {Boolean} week           modified this week
     * @param  {Boolean} month          modified this month
     * @param  {Boolean} year           modified this year
     * @param  {Boolean} lastyear       modified 2013
     * @param  {Boolean} yearbeforelast modified 2012
     * @return {VideoCollection}        filtered videoCollection
     */
	customFilter: function(searchString, week, month, year, lastyear, yearbeforelast) {
		filtered = this.filter(function(video) {
			var videoDate = Date.parse(video.get('modified')),
				isInDateRange = false;

			if (week) {
				isInDateRange = Date.compare(videoDate, Date.monday()) === 1;
			}
			if (month) {
				isInDateRange = Date.compare(videoDate, Date.today().moveToFirstDayOfMonth()) === 1;
			}
			if (year) {
				isInDateRange = Date.compare(videoDate, Date.january().first()) === 1;
			}
			if (lastyear) {
				isInDateRange = 	Date.compare(videoDate, Date.parse('December 31st 2012')) === 1 && 
						Date.compare(videoDate, Date.parse('January 1st 2014')) === -1;
			}
			if (yearbeforelast) {
				isInDateRange = Date.compare(videoDate, Date.parse('December 31st 2011')) === 1 && 
						Date.compare(videoDate, Date.parse('January 1st 2013')) === -1; 
			}
			return isInDateRange && video.get('title').toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
		});
		return new VideoCollection(filtered);
	},

	parse: function(response) {
        return response.results;
    },

});

module.exports = VideoCollection;
