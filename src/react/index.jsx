var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var App = require('./components/App.jsx');

var Router = Backbone.Router.extend({
	routes: {
		"": "index"
	},
	index: function() {
		React.render( 
			<App/> ,
			document.body
		);
	}
});
new Router();
Backbone.history.start();

